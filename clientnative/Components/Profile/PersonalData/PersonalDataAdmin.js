import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
// import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
// import StarRating from "../StarRating";
// import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import { cleanToken } from "../../../Redux/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderBar from "../../Utils/HeaderBar";
import * as SecureStore from "expo-secure-store";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from 'expo-linear-gradient';

const PersonalDataAdmin = () => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    await SecureStore.setItemAsync(key, value);
  }
  
  const cerrarsesion = () =>{
    console.log("cerrar sesion")
    dispatch(cleanToken())
    save("token", "(result)")
    
    navigation.navigate('Login')
  }

  // useEffect(() => {
  //   //console.log("data", data)
  // }, [data]);

  return (
    <LinearGradient
      colors={["rgba(41,63,173,1)", "rgba(12,0,58,1)"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0.5 }}
    >
      <View style={styles.container}>
        <View showsVerticalScrollIndicator={false}>
          <View
          // style={{
          //   flexDirection: "column",
          //   alignContent: "center",
          //   // marginLeft: wp('5%'),
          //}}
          >
            <View style={styles.containerImg}>
              <Image
                // resizeMode="contain"
                source={{
                  uri:
                    data?.photo === null || data?.photo === "url"
                      ? // ? "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg"
                        "https://www.radiotruck.sk/wp-content/uploads/2021/05/cropped-logo-radio-truckmale-1.png"
                      : data?.photo,
                }}
                style={styles.userImg}
              />
            </View>
            <View style={styles.boxDatos}>
              <Text style={styles.userName}>
                {/* Matias Vila */}
                {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}{" "}
                {data?.lastName.charAt(0).toUpperCase() +
                  data?.lastName.slice(1)}
              </Text>
              <Text style={styles.userName2}>
                {/* Administrador de RadioTruck */}
                Administrador de{" "}
                {data?.business.charAt(0).toUpperCase() +
                  data?.business.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.botones}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("EditProfileCarrier")}
            >
              <LinearGradient
                colors={["transparent", "#ff1c49"]}
                style={{
                  ...styles.btn,
                  width: "100%",
                  height: "100%",
                }}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
              >
                <Icon4 name="user-edit" style={styles.icons} />
                <Text style={styles.textBtn}>Editar perfil</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <LinearGradient
                colors={["transparent", "#ff1c49"]}
                style={{
                  ...styles.btn,
                  width: "100%",
                  height: "100%",
                }}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
              >
                <Icon name="key" style={styles.icons} />
                <Text style={styles.textBtn}>Cambiar contraseña</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={cerrarsesion}>
            <LinearGradient
                colors={["transparent", "#ff1c49"]}
                style={{
                  ...styles.btn,
                  width: "100%",
                  height: "100%",
                }}
                start={{ x: 1, y: 0.5 }}
                end={{ x: 0, y: 0.5 }}
              >
              <Icon name="log-out" style={styles.icons} />
              <Text style={styles.textBtn}>Cerrar sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PersonalDataAdmin;

const styles = StyleSheet.create({
  containerImg: {
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    borderColor: "#E1E8EB",
    borderWidth: 1,
    //Properties to setup your Shadow

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#E1E8EB",
    shadowOpacity: 80,
    elevation: 15,
    backgroundColor: "#E1E8EB",
  },
  icons: {
    alignContent: "flex-start",
    fontSize: hp("3.5%"),
    color: "white",
    paddingTop: wp("1.3%"),
    //marginRight: wp("0.1%"),
    //marginLeft: wp('-1%'),
    // backgroundColor: 'white',
    // borderRadius: wp('7%'),
    width: wp('12%'),
    // height: hp('5.2%'),
    // marginTop: wp('-1%')
  },
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'linear-gradient(207.8deg, #201E1C 16.69%, #325e8f 100%);'
   },
  perfilTex: {
    // marginTop:hp("2%"),
    alignSelf:'center',
    fontSize: hp("4.8%"),
    fontWeight: "bold",
    textDecorationColor: "#ada012",
    marginBottom:hp("2%"),
  },
  userImg: {
    height: '100%',
    width: '100%',
    // borderRadius: wp('3%'),
    // borderWidth: wp('0.9%'),
    // borderColor: "black",
  },
  userName: {
    fontSize: hp('3.5%'),
    // fontWeight: "bold",
    alignSelf:'center',
    color:"white",
  },
  boxDatos: {
    // flexDirection: "column",
    
    marginTop: hp("1%"),
    
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
   marginTop : wp('8%')
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    //backgroundColor: "#ada012",
    width: wp("88%"),
    height: hp("8%"),
    //padding: wp('2.5%'),
    borderRadius: wp('3%'),
    marginTop: wp("7%"),
    shadowOpacity: 80,
    elevation: 15,
    // borderColor: "black",
    // borderWidth: hp("0.5%"),
    alignItems: "center"
  },
  textBtn: {
    color: "white",
    //justifyContent:"center",
    textAlign: "center",
    //alignContent: "center",
    //marginHorizontal: 55,
    // paddingLeft: wp("7%"),
    fontSize: hp('2.7%'),
    //marginTop: wp('0.9%'),
    fontWeight: '600',
    width: wp("55%"),
  },
  
  userName2: {
    fontSize: hp("2.24%"),
    alignSelf:'center',
    // marginTop: 7,
    // marginBottom: wp("3%"),
    color: "#ada012"
  },
});
