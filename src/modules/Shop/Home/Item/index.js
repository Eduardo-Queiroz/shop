import React from "react";
import { useSelector, useDispatch, useMemo } from "react-redux";
import { Avatar, Card } from "react-native-paper";
import { IconButton } from "~/components";

import { Actions } from "~/redux/reducers/shop";
const { shopAddLike } = Actions;

export const Item = ({ id, name, image, origin, like }) => {
  const dispatch = useDispatch();
  return (
    <Card style={{ margin: 10, marginVertical: 6 }}>
      <Card.Title
        title={`${name}`}
        subtitle={`${origin.name}`}
        left={(props) => (
          <Avatar.Image
            size={45}
            source={{
              uri: image,
            }}
          />
        )}
        right={(props) => (
          <IconButton
            idTrack="Shop_Item_like"
            size={22}
            color="#c60609"
            icon={like ? "heart" : "heart-outline"}
            onPress={() => dispatch(shopAddLike({ id, like }))}
          />
        )}
      />
    </Card>
  );
};
