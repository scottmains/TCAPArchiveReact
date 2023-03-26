import React, { useState, useEffect, useRef } from 'react';
import styles from './chatline.module.css';
import cn from 'classnames'
import { InView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import loadingIcon from '../assets/loading-icon.gif';

const Chatlog = ({ chatSessionId, searchQuery, dropdownQuery, predatorId }) => {

  const [chatlog, setChatlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [messageClicked, setMessageClicked] = useState(false);

  const pageNumber = useRef(1);
  const pageSize = 50;

  const messageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };
  const fetchData = async (isSearch = false) => {
    setLoading(true);
    try {
      const url = new URL(`https://localhost:7039/api/chatlog/chatlines/${chatSessionId}`);
      const params = {
        pageNumber: pageNumber.current,
        pageSize: pageSize,
        searchQuery: searchQuery,
        dropdownQuery: dropdownQuery
      };
      url.search = new URLSearchParams(params).toString();
  
      const chatlogData = await fetch(url);
      const chatlogJson = await chatlogData.json();
  
      if (isSearch) {
        setChatlog(chatlogJson.data);
      } else {
        setChatlog(prevChatlog => [...prevChatlog, ...chatlogJson.data]);
      }
      setHasMore(chatlogJson.data.length > 0);
      pageNumber.current += 1;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessagesAfterPosition = async (position) => {
    setMessageClicked(true);
    setLoading(true);
    try {
      const url = new URL(`https://localhost:7039/api/chatlog/chatlines/${chatSessionId}`);
      const params = {
        pageNumber: 1, // Reset the pageNumber to fetch from the beginning
        pageSize: pageSize,
        position: position,
      };
      url.search = new URLSearchParams(params).toString();
  
      const chatlogData = await fetch(url);
      const chatlogJson = await chatlogData.json();
      if (chatlogJson.data) {
        setChatlog(chatlogJson.data);
      }
      setHasMore(chatlogJson.data.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    // Reset the chatlog and pageNumber when the searchQuery changes
    setChatlog([]);
    pageNumber.current = 1;
  
    fetchData(true);
  }, [searchQuery, dropdownQuery]);

  useEffect(() => {
    setMessageClicked(false);
  }, [searchQuery]);

  const handleLoadMore = (inView) => {
    if (inView && !loading && hasMore) {
      fetchData();
    }
  };
  let lastShownTimestamp = null;

  const shouldShowTimestamps = (prevTimestamp, currTimestamp) => {
    if (!prevTimestamp) {
      lastShownTimestamp = currTimestamp;
      return true;
    }
  
    const oneHourInMilliseconds = 1000 * 60 * 60;
    const diff = Math.abs(new Date(currTimestamp) - new Date(lastShownTimestamp));
  
    const isNewDate = new Date(lastShownTimestamp).toLocaleDateString() !== new Date(currTimestamp).toLocaleDateString();
  
    if (diff >= oneHourInMilliseconds || isNewDate) {
      lastShownTimestamp = currTimestamp;
      return true;
    }
  
    return false;
  };
  
  return (
    <div className="container mt-4">
      <ol className={styles.list}>
        {chatlog.map((chat, index) => {
          const sent = chat.senderId === predatorId;
          const isLast = index > 0 && chatlog[index - 1].senderId === chat.senderId;
          const prevTimestamp = index > 0 ? chatlog[index - 1].timeStamp : null;
          const shouldShowTimestamp = shouldShowTimestamps(prevTimestamp, chat.timeStamp);
  
          return (
            <InView key={chat.id}>
              {({ inView, ref }) => (
                <>
                  {shouldShowTimestamp && (
                    <div className={styles.timestamp}>
                      {new Date(chat.timeStamp).toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        hour12: true,
                      })}
                    </div>
                  )}
  
                  <motion.li
                    ref={ref}
                    className={cn(
                      styles.shared,
                      sent ? styles.sent : styles.received,
                      isLast && styles.noTail
                    )}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={messageVariant}
                  >
                    <div
                        className={styles.message}
                        onClick={searchQuery && !messageClicked ? () => fetchMessagesAfterPosition(chat.position) : null}
                      >
                        {chat.message}
                    </div>
                  </motion.li>
                </>
              )}
            </InView>
          );
        })}
     <InView
  as="div"
  onChange={handleLoadMore}
  threshold={1}
>
<div className={styles.loadMore}>
  {loading ? 
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <img src={loadingIcon} alt="loading..." />
    </div> 
    : hasMore ? 'Scroll down for more' : 'No more messages'}
</div>

</InView>
      </ol>
    </div>
  );
    };

export default Chatlog;
