import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView, View } from "react-native";
import { FlatList } from "~/components";
import { Item } from "./Item";
import Header from "./Header";
import Loader from "./Loader";
import Empty from "./Empty";

import { Actions } from "~/redux/reducers/shop";
const { shopList, shopLike, shopListLoadMore } = Actions;

const ShopHome = () => {
  const dispatch = useDispatch();
  const { list, pending } = useSelector(({ shop: { list, pending } }) => ({
    list,
    pending,
  }));
  useEffect(() => {
    dispatch(shopList());
  }, []);
  return (
    <SafeAreaView>
      <Header />
      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Item {...item} />}
        ListEmptyComponent={!!pending ? <Loader /> : <Empty />}
        trackExtractor={({ item }) => `Shop_Item_${item.name}`}
        ListFooterComponent={<View style={{ marginBottom: 200 }} />}
        onEndReached={() => dispatch(shopListLoadMore())}
        onEndReachedThreshold={0.2}
      />
    </SafeAreaView>
  );
};

export default ShopHome;
