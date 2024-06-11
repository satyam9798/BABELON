import React from "react";
import { ScrollView } from "react-native";
import ChatList from "./ChatList";

const ChatScene = ({ data, navigation }) => {
  return (
    <ScrollView>
      {data && data.length >= 1 ? (
        <>
          {data.map((data, index) => {
            return <ChatList key={index} data={data} navigation={navigation} />;
          })}
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default ChatScene;
