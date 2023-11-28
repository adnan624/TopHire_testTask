/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../assets/colors';
import {ms, vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextVarient} from '../theme/typography';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  Bag,
  DownArrow,
  Heart,
  ImageDemo,
  PlusIcon,
  Search,
} from '../assets/images';
import {fetchDataHandler} from '../redux/apiHandler';
import {addToCart} from '../redux/slice';
const Header = ({navigation, Cartcount}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={{
        height: vs(50),
        marginTop: top,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: vs(30),
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: ms(20),
        }}>
        <Text style={{...TextVarient.h2.bold, color: '#FFFFFF'}}>
          Hey, Rahul
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={{
            height: vs(24),
            width: vs(24),
          }}>
          <SvgXml xml={Bag} />
          <View
            style={{
              backgroundColor: Colors.yellow100,
              height: ms(20),
              zIndex: 99,
              marginTop: -vs(25),
              width: ms(20),
              marginLeft: ms(10),
              borderRadius: ms(20),
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextVarient.h4.bold,
                color: '#FFFFFF',
                fontSize: ms(15),
              }}>
              {Cartcount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchCompont = () => {
  return (
    <View
      style={{
        marginHorizontal: ms(20),
        flexDirection: 'row',
        backgroundColor: Colors.blue100,
        borderRadius: ms(20),
        alignItems: 'center',
        paddingHorizontal: ms(20),
        marginVertical: vs(20),
      }}>
      <SvgXml xml={Search} />

      <TextInput
        placeholderTextColor={Colors.black45}
        placeholder="Search Products or store"
        style={{
          height: vs(40),
          borderRadius: 20,
          paddingLeft: 20,
        }}
      />
    </View>
  );
};

const DeliveryCompont = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.blue60,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: ms(20),
        justifyContent: 'space-between',
      }}>
      <View style={{height: vs(40)}}>
        <Text
          style={{
            ...TextVarient.h4.bold,
            textTransform: 'uppercase',
            fontSize: ms(13),
            color: Colors.black45,
          }}>
          Delivery to
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              ...TextVarient.h4.bold,
              textTransform: 'capitalize',
              fontSize: ms(14),
              color: Colors.black1,
              marginRight: ms(10),
            }}>
            Green Way 3000, Sylhet
          </Text>
          <SvgXml xml={DownArrow} />
        </View>
      </View>
      <View style={{height: vs(40)}}>
        <Text
          style={{
            ...TextVarient.h4.bold,
            textTransform: 'uppercase',
            fontSize: ms(13),
            color: Colors.black45,
          }}>
          Within
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              ...TextVarient.h4.bold,
              textTransform: 'capitalize',
              fontSize: ms(14),
              color: Colors.black1,
              marginRight: ms(10),
            }}>
            1 Hour
          </Text>
          <SvgXml xml={DownArrow} />
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDataHandler(dispatch, 'https://dummyjson.com/products');
  }, []);

  const {items, cart, loading} = useSelector(state => state);
  return (
    <View style={{flex: 1, backgroundColor: Colors.blue60}}>
      <Header navigation={navigation} Cartcount={cart?.length || 0} />
      <SearchCompont />
      <DeliveryCompont />
      <View style={{flex: 1, backgroundColor: Colors.black1}}>
        <View style={{height: vs(155)}}>
          <FlatList
            data={items?.products || [1, 2, 3]}
            horizontal
            style={{
              marginVertical: vs(25),
              marginHorizontal: vs(20),
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{width: ms(20)}} />}
            renderItem={() => {
              return (
                <View
                  style={{
                    width: ms(250),
                    backgroundColor: Colors.yellow100,
                    height: vs(100),
                    borderRadius: ms(20),
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <View style={{height: '100%', justifyContent: 'center'}}>
                    <SvgXml
                      xml={ImageDemo}
                      style={{marginHorizontal: ms(20)}}
                    />
                  </View>
                  <View>
                    <Text
                      style={{...TextVarient.h3.regular, color: Colors.black1}}>
                      Get
                    </Text>
                    <Text
                      style={{...TextVarient.h3.bold, color: Colors.black1}}>
                      50% OFF
                    </Text>
                    <Text
                      style={{
                        ...TextVarient.h4.regular,
                        color: Colors.black1,
                        fontSize: ms(15),
                      }}>
                      on first 03 orders
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{paddingHorizontal: ms(20)}}>
          <FlatList
            data={items?.products || []}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              loading && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'large'} />
                </View>
              )
            }
            ListHeaderComponent={
              <View style={{paddingHorizontal: ms(10)}}>
                <Text style={{...TextVarient.h2.regular, letterSpacing: ms(1)}}>
                  Recommended
                </Text>
              </View>
            }
            ItemSeparatorComponent={<View style={{height: vs(10)}} />}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', item)}
                  style={{
                    width: '50%',
                    backgroundColor: Colors.black1,
                    height: vs(150),
                    borderRadius: ms(20),
                  }}>
                  <ImageBackground
                    source={{uri: item?.thumbnail}}
                    imageStyle={{
                      height: vs(150),
                      alignItems: 'center',
                      backgroundColor: Colors.black10,
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                      opacity: 0.7,
                    }}
                    style={{
                      height: vs(150),
                      alignItems: 'center',
                      margin: 10,
                      backgroundColor: Colors.black10,
                      borderRadius: ms(20),
                      padding: ms(15),
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        marginHorizontal: ms(20),
                        width: '100%',
                        alignItems: 'flex-start',
                      }}>
                      <SvgXml xml={Heart} />
                    </View>
                    <View style={{marginHorizontal: ms(20)}} />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '35%',
                        width: '100%',
                        justifyContent: 'space-between',
                        height: vs(30),
                      }}>
                      <View>
                        <Text
                          style={{...TextVarient.h4.bold, fontSize: ms(15)}}>
                          ${item?.price}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            ...TextVarient.h4.semibold,
                            fontSize: ms(10),
                            color: Colors.black45,
                            lineHeight: vs(15),
                            width: ms(100),
                          }}>
                          {item?.title}, {item.brand}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => dispatch(addToCart({...item, count: 1}))}
                        style={{
                          height: vs(18),
                          backgroundColor: Colors.blue60,
                          width: vs(18),
                          borderRadius: ms(20),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <SvgXml xml={PlusIcon} />
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
