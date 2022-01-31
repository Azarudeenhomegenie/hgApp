import React, { useEffect, useState, PureComponent } from "react";
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ActivityIndicator,
    Pressable,
    StatusBar,
} from "react-native";
import Swiper from "react-native-swiper";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
import Header from "../components/Header";
import colors from "../components/AllColors";
import Whatsapp800 from "../components/Whatsapp800";
import { connect } from "react-redux";
import { getCity, getPopularService, getOffers, getSearch, getAllCategories } from "../actions/hgAction";
import { TouchableHighlight } from "react-native-gesture-handler";

const HomeScreen = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [offer, setOffer] = useState([]);
    const [feed, setFeed] = useState([]);
    const [infoBar, setInfoBar] = useState(true);
    const [data, setData] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);


    const [specializedData, setSpecializedData] = useState([]);
    const [specializedData2, setSpecializedData2] = useState([]);
    const [specializedData3, setSpecializedData3] = useState([]);
    const getSpecialized = async () => {
        try {
            const response = await fetch('https://api.homegenie.com/api/category/getAllCategories');
            const json = await response.json();
            let datas = json.data;
            datas = datas.filter(x => x.name === 'Specialised Services');
            let data1 = [];
            let data2 = [];
            let data3 = [];
            datas.forEach(allData => {
                data1.push(allData.subcategories[0])
                data2.push(allData.subcategories[1])
                for (obj of allData.subcategories.slice(2)) {
                    data3.push({
                        _id: obj._id,
                        subCategoryName: obj.subCategoryName,
                        image: obj.image
                    })
                }
            })
            setSpecializedData(data1);
            setSpecializedData2(data2);
            setSpecializedData3(data3);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        global.gen = 2;
        getSpecialized();
        //props.getAllCategories();
        props.getCity();
        props.getSearch();
        props.getPopularService('Dubai', 'en');
        props.getOffers('Dubai', 'en')
        setMostPopular(props.hg.getPopularService)
        setData(props.hg.getOffers)
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <Header />
            <ScrollView style={styles.ScrollView}>
                <View>
                    <Swiper
                        style={styles.wrapper}
                        height={200}
                        dot={
                            <View
                                style={{
                                    elevation: 1,
                                    zIndex: 1,
                                    backgroundColor: "#fff",
                                    width: 20,
                                    height: 3,
                                    borderRadius: 0,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    bottom: -6,
                                }}
                            />
                        }
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: "#2EB0E4",
                                    width: 25,
                                    height: 3,
                                    borderRadius: 0,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    bottom: -6,
                                }}
                            />
                        }
                        paginationStyle={{ bottom: 17, left: null, right: 25 }}
                        autoplay={true}
                        autoplayDirection
                        scrollEnabled
                        autoplayTimeout={4}
                    >
                        <View
                            style={styles.slide}
                            title={
                                <View style={styles.homeBannerTextBox}>
                                    <Text
                                        style={styles.homeBannerText}
                                        style={{
                                            marginTop: 10,
                                            color: "#fff",
                                            fontSize: 12,
                                            left: 10,
                                        }}
                                    >
                                        At your service, on-demand! {"\n"}Making home services
                                        experts {"\n"}simple, reliable and affordable.{" "}
                                    </Text>
                                    <Pressable style={styles.homeBannerButton} onPress={() => props.navigation.navigate('Offers')}>
                                        <Text style={styles.homeBannerButtonText}>BOOK NOW</Text>
                                    </Pressable>
                                </View>
                            }
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 200 }}
                                source={require("../assets/home_slider1.jpg")}
                            />
                        </View>
                        <View
                            style={styles.slide}
                            title={
                                <View style={styles.homeBannerTextBox}>
                                    <Text style={[styles.homeBannerTextLaunch]}>NEW LAUNCHES</Text>
                                    <Text
                                        style={styles.homeBannerText}
                                        style={{
                                            marginTop: 15,
                                            color: "#fff",
                                            fontSize: 12,
                                            left: 10,
                                        }}
                                    >
                                        We're now LIVE in AbuDhabi. {"\n"}Get AED 25 OFF on first
                                        self service. HGSELF25{" "}
                                    </Text>
                                    <Pressable style={styles.homeBannerButton} onPress={() => props.navigation.navigate("GetGenie")}>
                                        <Text style={styles.homeBannerButtonText}>BOOK NOW</Text>
                                    </Pressable>
                                </View>
                            }
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 200 }}
                                source={require("../assets/home_slider2.jpg")}
                            />
                        </View>
                        <View
                            style={styles.slide}
                            title={
                                <View style={styles.homeBannerTextBox}>
                                    <Text style={styles.homeBannerTextLaunch}>NEW LAUNCHES</Text>
                                    <Text
                                        style={styles.homeBannerText}
                                        style={{
                                            marginTop: 10,
                                            color: "#fff",
                                            fontSize: 12,
                                            left: 10,
                                        }}
                                    >
                                        Launching COVID19 services {"\n"}Services you need in the
                                        safety and comfort {"\n"}of your home.{" "}
                                    </Text>
                                    <Pressable style={styles.homeBannerButton} onPress={() => props.navigation.navigate("GetGenie")}>
                                        <Text style={styles.homeBannerButtonText}>BOOK NOW</Text>
                                    </Pressable>
                                </View>
                            }
                        >
                            <Image
                                resizeMode="contain"
                                style={{ width: "100%", height: 200 }}
                                source={require("../assets/home_slider3.jpg")}
                            />
                        </View>
                    </Swiper>
                </View>
                {infoBar ? (
                    <View
                        style={
                            ([styles.infoBar, styles.flexRow],
                            {
                                backgroundColor: "#f6b700",
                                padding: 10,
                                marginTop: -2,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            })
                        }
                    >
                        <View style={([styles.textLeft], { width: "75%" })}>
                            <Text
                                style={
                                    ([styles.infoBarText],
                                        { fontSize: 11, color: "#fff", letterSpacing: 0.1 })
                                }
                            >
                                Learn more about the{" "}
                                <Text style={{ fontWeight: "bold" }}>COVID-19 measures</Text>{" "}
                                we’re taking to ensure the safety of our customers and us.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.cancelButton]}
                            onPress={() => setInfoBar(!infoBar)}
                        >
                            <Text
                                style={
                                    ([styles.cancelButtonText], { color: "#fff", fontSize: 18 })
                                }
                            >
                                x
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={[styles.section]}>
                    <Text style={[styles.mostPopular]}>
                        MOST POPULAR
                    </Text>
                    <SwiperFlatList
                        autoplay={true}
                        autoplayDelay={3}
                        autoplayLoop={true}
                        data={mostPopular}
                        keyExtractor={(item, index) => {
                            return item._id;
                        }}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.child]} onPress={() => props.navigation.navigate('GetGenie')}>
                                <Image
                                    style={styles.mostPopularImage}
                                    source={{
                                        uri: item.imageURL,
                                    }}
                                />
                                <Text style={styles.textFlat}>{item.name}</Text>
                            </Pressable>
                        )
                        }
                    >
                    </SwiperFlatList>
                </View>
                <View style={styles.screen}>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textLeft]}>
                            Service Categories
                        </Text>
                        <View style={[css.flexDRSB, css.imgFull]}>
                            <Pressable
                                style={[styles.imageContainer, css.width50]}
                                onPress={() => props.navigation.navigate("CategoryPage", {
                                    catName: 'dailyutilities',
                                })}
                            >
                                <Image
                                    source={require("../assets/Handyman.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <Text style={styles.serviceTitle}>DAILY {"\n"}UTILITIES</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.imageContainer, css.width50]}
                                onPress={() => props.navigation.navigate("CategoryPage", {
                                    catName: 'healthandwellness',
                                })}
                            >
                                <Image
                                    source={require("../assets/pcr.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <Text style={styles.serviceTitle}>Health & {"\n"}Wellness</Text>
                            </Pressable>
                        </View>
                        <View style={[css.flexDRSB, css.imgFull]}>
                            <Pressable
                                style={[styles.imageContainer, css.width50]}
                                onPress={() => props.navigation.navigate("CategoryPage", {
                                    catName: 'lifestyledecor',
                                })}
                            >
                                <Image
                                    source={require("../assets/Lifestyle.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <Text style={styles.serviceTitle}>Lifestyle {"\n"}& Decor</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.imageContainer, css.width50]}
                                onPress={() => props.navigation.navigate("CategoryPage", {
                                    catName: 'others',
                                })}
                            >
                                <Image
                                    source={require("../assets/pet_groom.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <Text style={styles.serviceTitle}>Others</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textLeft]}>
                            Offers & Promos
                        </Text>
                        {isLoading ? <ActivityIndicator /> : (
                            <SwiperFlatList
                                autoplay={true}
                                autoplayDelay={3}
                                autoplayLoop={true}
                                data={data}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[styles.swiperOffer, { height: 200, width: 380 }]}
                                        onPress={() => props.navigation.navigate('GetGenie')}
                                    >
                                        <Image
                                            key={item._id}
                                            style={[styles.swiperOfferImage]}
                                            source={{
                                                uri: item.image,
                                            }}
                                        />
                                        <View style={{ position: 'absolute', top: 10, left: 15, width: 160, height: 30, backgroundColor: '#f6b700', alignItems: 'center', justifyContent: 'center', fontFamily: "PoppinsBL" }}>
                                            <Text style={{ color: '#fff' }}>{item.soldCount} claimed already! </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textCenter]}>
                            Specialized services
                        </Text>
                        <Text style={[styles.homeTitlesSub, styles.textCenter]}>
                            Handpicked services from innovated brands. Now available!
                        </Text>
                        <View style={[styles.specialServiceAll]}>
                            <FlatList
                                data={specializedData}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <View
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <ImageBackground
                                                source={{
                                                    uri: item.image,
                                                }}
                                                style={{
                                                    height: 250,
                                                }}
                                                imageStyle={{
                                                    resizeMode: "cover",
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                }}
                                            ></ImageBackground>
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            {item.subCategoryName}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <FlatList
                                data={specializedData2}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={[styles.specialserviceSecond, { marginTop: 20 }]} onPress={() => props.navigation.navigate('GetGenie')}>
                                        <View
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: "100%",
                                                    height: 120,
                                                    borderRadius: 10,
                                                    resizeMode: "cover",
                                                }}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            {item.subCategoryName}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <View style={[styles.specialserviceThird,]}>
                                <SwiperFlatList
                                    autoplay={true}
                                    autoplayDelay={3}
                                    autoplayLoop={true}
                                    style={[
                                        styles.SwiperFlatListSpecial,
                                        {
                                            borderTopColor: "grey",
                                            borderTopWidth: 1,
                                            marginTop: 10,
                                        },
                                    ]}
                                    data={specializedData3}
                                    keyExtractor={(item, index) => {
                                        return item._id;
                                    }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => props.navigation.navigate('GetGenie')}>
                                            <View style={[styles.childd,]}>
                                                <View
                                                    style={{
                                                        borderBottomWidth: 10,
                                                        borderColor: "#2eb0e4",
                                                        borderRadius: 10,
                                                        marginTop: 10,

                                                    }}
                                                >
                                                    <Image
                                                        style={[styles.specialserviceThirdImage]}
                                                        source={{
                                                            uri: item.image,
                                                        }}
                                                    />
                                                </View>
                                                <Text style={styles.textSpecialService}>
                                                    {item.subCategoryName}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                >
                                </SwiperFlatList>
                            </View>
                            {/* <Pressable style={[styles.specialserviceThird]} onPress={() => props.navigation.navigate('GetGenie')}>
                                <SwiperFlatList
                                    autoplay={true}
                                    autoplayDelay={3}
                                    autoplayLoop={true}
                                    style={[
                                        styles.SwiperFlatListSpecial,
                                        {
                                            borderTopColor: "grey",
                                            borderTopWidth: 1,
                                            marginTop: 10,
                                        },
                                    ]}
                                >
                                    <View style={[styles.childd]}>
                                        <View
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,

                                            }}
                                        >
                                            <Image
                                                style={[styles.specialserviceThirdImage]}
                                                source={{
                                                    uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/Leak-Dtech-high-tech-leakage-detection20211009T08:27:01.jpg",
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            Leak Dtech High tech leakage detection
                                        </Text>
                                    </View>
                                    <View style={[styles.childd]}>
                                        <View
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <Image
                                                style={styles.specialserviceThirdImage}
                                                source={{
                                                    uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/Grout-cleaning-with-Coustic-Glo20211024T17:23:03.jpg",
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            Grout cleaning with coustic GLO
                                        </Text>
                                    </View>
                                    <View style={[styles.childd]}>
                                        <View
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                        >
                                            <Image
                                                style={styles.specialserviceThirdImage}
                                                source={{
                                                    uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/Leather-doctor--Leather-restoration20211024T17:23:59.jpg",
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            Leather Doctor - Leather Restoration
                                        </Text>
                                    </View>
                                </SwiperFlatList>
                            </Pressable> */}
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textCenter]}>
                            HomeGenie Happiness Warranty
                        </Text>
                        <View style={styles.flexRow}>
                            <Image
                                source={require("../assets/hgWarranty.png")}
                                style={styles.warrantyImage}
                            />
                            <Text style={styles.content}>
                                All service bookings are covered with at least an AED 1000
                                warranty against any damages.{" "}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.whyHomegenieSection}>
                            <Text style={styles.whyHomegenieText}>Why HomeGenie?</Text>
                            <View style={styles.flexRowSpace}>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require("../assets/expert.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>
                                        Expert {"\n"} professionals
                                    </Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require("../assets/priceverification.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>Great {"\n"} prices</Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require("../assets/oneshop.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>One-stop {"\n"} shop</Text>
                                </View>
                            </View>
                            <View style={styles.flexRowSpace}>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require("../assets/qualityControl.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>
                                        Enabling {"\n"} technology
                                    </Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require("../assets/customerService.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>
                                        World-class {"\n"} service
                                    </Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    {/* <Image source={require('../assets/customerRating.png')} /> */}
                                    <Text style={styles.whyContent}>... and {"\n"} more!</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.featureIN}>
                            <Text style={styles.featureInText}>Featured in</Text>
                            <View style={styles.flexRowSpace}>
                                <Image source={require("../assets/gulfNews.png")} />
                                <Image source={require("../assets/khaleejTimes.png")} />
                                <Image source={require("../assets/theNational.png")} />
                            </View>
                            <View style={styles.space10}></View>
                            <View style={styles.flexRowSpace}>
                                <Image source={require("../assets/business.png")} />
                                <Image source={require("../assets/247.png")} />
                                <Image source={require("../assets/forbes.png")} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.flexRowSpace}>
                            <View>
                                <Text style={styles.needHelpText}>Need Help?</Text>
                            </View>
                            <Whatsapp800 />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 0,
        fontFamily: 'PoppinsM',
    },
    section: {
        padding: 20,
        fontFamily: 'PoppinsM',
    },
    textCenter: {
        textAlign: "center",
        fontFamily: 'PoppinsM',
    },
    textLeft: {
        textAlign: "left",
    },
    homeTitles: {
        fontSize: 20,
        color: "#2EB0E4",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'PoppinsM',
    },
    homeTitlesSub: {
        fontSize: 12,
        color: "grey",
    },
    mostPopular: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 10,
        marginBottom: 10,
        backgroundColor: "#f6b700",
        padding: 5,
        width: 110,
        textAlign: 'center',
        fontFamily: 'PoppinsM',
    },
    flexRow: {
        flexDirection: "row",
    },
    flexRowSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginBottom: 10,
        position: "relative",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 10,
    },
    serviceTitle: {
        position: "absolute",
        bottom: 5,
        left: 10,
        color: "#fff",
        fontSize: 20,
        fontFamily: 'PoppinsBO',
        textTransform: "uppercase",
        shadowColor: "#00000050", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.7, shadowRadius: 2.84, elevation: 5,
    },
    content: {
        textAlignVertical: "center",
        fontSize: 18,
        flex: 1,
        paddingLeft: 10,
    },
    whyContent: {
        textAlignVertical: "bottom",
        fontSize: 14,
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    alignCenter: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    whyHomegenieSection: {
        backgroundColor: "#EFF7FC",
        borderRadius: 20,
        padding: 20,
    },
    whyHomegenieText: {
        textAlign: "center",
        fontSize: 20,
        color: "#525252",
    },
    whyHomegenieImage: {
        marginTop: 20,
        alignItems: "center",
        flex: 1,
    },
    warrantyImage: {
        width: 130,
        height: 110,
    },
    featureInText: {
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 16,
        color: "#525252",
        marginBottom: 20,
    },
    space10: {
        paddingBottom: 10,
    },
    needHelpText: {
        color: "#2EB0E4",
        fontSize: 16,
        fontWeight: "bold",
    },
    wrapper: {
        height: 200,
    },
    img100: {
        width: "100%",
    },
    borderRadius10: {
        borderRadius: 50,
    },
    slide1: {
        flex: 1,
        width: "100%",
        backgroundColor: "#9DD6EB",
        borderRadius: 0,
    },
    slide2: {
        flex: 1,
        width: "100%",
        backgroundColor: "#97CAE5",
    },
    slide3: {
        flex: 1,
        width: "100%",
        backgroundColor: "#92BBD9",
    },
    text: {
        color: "#000",
        fontSize: 30,
        fontWeight: "bold",
    },
    ScrollView: {
        backgroundColor: "transparent",
        padding: 0,
        marginTop: -20,
        elevation: 3,
    },

    slide1: {
        flex: 1,
        width: "100%",
    },

    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5",
    },

    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9",
    },

    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
    },
    homeBannerTextBox: {
        backgroundColor: "#00000052",
        height: 60,
        width: 500,
        flex: 1,
        position: "absolute",
        bottom: 33,
        right: 0,
        left: 0,
        elevation: 0,
        zIndex: 0,
    },
    homeBannerTextLaunch: {
        backgroundColor: "#fff",
        position: "absolute",
        left: 10,
        bottom: 50,
        padding: 5,
        fontSize: 10,
        color: "#000",
    },
    homeBannerText: {},
    homeBannerButton: {
        height: 30,
        width: 110,
        backgroundColor: "#f6b700",
        position: "absolute",
        bottom: 20,
        right: 110,
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    homeBannerButtonText: {
        color: "#fff",
        fontSize: 12,
    },
    child: {
        borderRadius: 10,
        borderColor: "grey",
        padding: 5,
        width: 80,
        marginRight: 8,
        marginBottom: 10,
        marginLeft: 2,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textFlat: {
        fontSize: 10,
        color: "#000",
        marginTop: 5,
        textAlign: "center",
    },
    mostPopularImage: {
        height: 35,
        width: 35,
    },
    textSpecialService: {
        textAlign: "center",
        fontSize: 12,
        color: "grey",
        marginTop: 5,
        textTransform: "uppercase",
        fontWeight: "bold",
        padding: 2,
    },
    childd: {
        width: 110,
        height: 220,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,

    },
    specialserviceThirdImage: {
        width: 110,
        height: 120,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderRadius: 0,
        resizeMode: "cover",
    },
    swiperOfferImage: {
        width: "90%",
        height: 200,
        borderRadius: 10,
        resizeMode: "contain",
    },

});

const mapStateToProps = (state) => ({
    hg: state.hg,
    error: state.error
})

export default connect(mapStateToProps, { getOffers, getPopularService, getCity, getSearch, getAllCategories })(HomeScreen);