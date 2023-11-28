/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../assets/colors';
import {ms, vs} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextVarient} from '../theme/typography';
import {SvgXml} from 'react-native-svg';
import {BackBlack, BlackBag, Heart, ImageDemoa} from '../assets/images';
import StarRating from 'react-native-star-rating-widget';
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decreaseQuantity} from '../redux/slice';

const TagItem = ({totalPrice, title}) => {
  return (
    <View
      style={{
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: vs(20),
      }}>
      <Text
        style={{
          ...TextVarient.h4.regular,
          fontSize: ms(14),
          color: Colors.black45,
        }}>
        {title}
      </Text>
      <Text
        style={{
          ...TextVarient.h4.semibold,
          fontSize: ms(14),
          color: Colors.black100,
        }}>
        $ {totalPrice}
      </Text>
    </View>
  );
};
const Header = ({navigation, cartCount}) => {
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
          paddingHorizontal: ms(20),
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: ms(40),
            width: ms(40),
            backgroundColor: Colors.black10,
            borderRadius: ms(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgXml xml={BackBlack} />
        </TouchableOpacity>

        <Text
          style={{
            ...TextVarient.h4.bold,
            color: Colors.black100,
            fontSize: ms(15),
            marginLeft: ms(15),
          }}>
          Shopping Cart ({cartCount})
        </Text>
      </View>
    </View>
  );
};
const Cart = ({navigation}) => {
  const {cart, totalPrice} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: Colors.black1}}>
      <Header navigation={navigation} cartCount={cart.length || 0} />
      <View style={{marginHorizontal: ms(20), marginTop: vs(30)}} />
      <FlatList
        data={cart}
        ItemSeparatorComponent={
          <View
            style={{
              height: vs(10),
              marginHorizontal: ms(20),
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.black20,
            }}
          />
        }
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: vs(55),
                marginHorizontal: ms(20),
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: ms(40),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.images[0]}}
                    style={{
                      height: ms(40),
                      width: ms(40),
                      borderRadius: ms(5),
                      backgroundColor: Colors.black10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />

                  <View style={{marginLeft: ms(10), width: '50%'}}>
                    <Text
                      numberOfLines={1}
                      style={{...TextVarient.h4.regular, fontSize: ms(14)}}>
                      {item?.title}
                    </Text>
                    <Text style={{...TextVarient.h4.regular, fontSize: ms(14)}}>
                      $ {item?.price}
                    </Text>
                  </View>
                </View>

                <View
                  style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => dispatch(addToCart(item))}
                    style={{
                      height: ms(40),
                      width: ms(40),
                      backgroundColor: Colors.black10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: ms(40),
                    }}>
                    <Text style={{...TextVarient.h2.regular}}>+</Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      ...TextVarient.h4.regular,
                      marginHorizontal: ms(15),
                      fontSize: ms(15),
                    }}>
                    {item.count}
                  </Text>

                  <TouchableOpacity
                    onPress={() => dispatch(decreaseQuantity(item))}
                    style={{
                      height: ms(40),
                      width: ms(40),
                      backgroundColor: Colors.black10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: ms(40),
                    }}>
                    <Text style={{...TextVarient.h2.regular}}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          backgroundColor: Colors.black10,
          marginHorizontal: ms(10),
          borderTopRightRadius: ms(40),
          borderTopLeftRadius: ms(40),
          alignItems: 'center',
          padding: ms(20),
          justifyContent: 'space-between',
          height: vs(160),
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <TagItem title="Subtotal" totalPrice={totalPrice} />
          <TagItem title="Delivery" totalPrice={2} />
          <TagItem title="Total" totalPrice={totalPrice + 2} />
        </View>

        <View
          style={{
            height: vs(45),
            borderWidth: 1,
            borderRadius: ms(20),
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.blue100,
          }}>
          <Text
            style={{
              ...TextVarient.h4.semibold,
              fontSize: ms(14),
              color: Colors.black1,
            }}>
            Proceed To checkout
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;
