import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    Pressable,
    FlatList,
    Dimensions,
    Linking,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Swiper from "react-native-swiper";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Text from "../../components/MyText";
import Header from '../../components/header';
import { connect } from "react-redux";
import { getCity, getPopularService, getOffers, getSearch, getSpecialized } from "../../actions/hgAction";
import css from '../../components/commonCss';
import StatusBar from '../../components/StatusBar';
import Whatsapp from "../../components/whtsApp";
let imgPath = '../../assets/icons/';
let imgPathImage = '../../assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = (props) => {
    const [infoBar, setInfoBar] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [specializedData, setSpecializedData] = useState([]);
    const [specializedData2, setSpecializedData2] = useState([]);
    const [specializedData3, setSpecializedData3] = useState([]);
    const [overlaySpecial, setOverlaySpecial] = useState(false);
    const [overlaySpecial2, setOverlaySpecial2] = useState(false);
    const toggleoverlaySpecial = () => { setOverlaySpecial(!overlaySpecial) };
    const toggleoverlaySpecial2 = () => { setOverlaySpecial2(!overlaySpecial2) };
    const [overlaySpecial3, setOverlaySpecial3] = useState(false);
    const toggleoverlaySpecial3 = () => { setOverlaySpecial3(!overlaySpecial3) };
    useLayoutEffect(() => {
        props.getCity();
        props.getPopularService('Dubai', 'en');
        props.getOffers('Dubai', 'en')
        props.getSpecialized();
    }, [])

    useEffect(() => {
        try {
            setSpecializedData(props.hg.getSpecialized[0][0])
            setSpecializedData2(props.hg.getSpecialized[0][1])
            setSpecializedData3(props.hg.getSpecialized[0][2])
        } catch (e) {
            console.log(e)
        }
    }, [props.hg.getSpecialized])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <Header data={props.hg.getCity} navigation={props.navigation} />
            <ScrollView
                style={styles.ScrollView}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <Swiper
                        style={styles.wrapper}
                        height={200}
                        dot={<View style={{ elevation: 1, zIndex: 9, backgroundColor: "#fff", width: 20, height: 2, borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, bottom: -6, }} />}
                        activeDot={<View style={{ backgroundColor: "#2EB0E4", width: 25, height: 2, borderRadius: 0, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, bottom: -6, }} />}
                        paginationStyle={{ bottom: 17, left: null, right: 25, zIndex: 9 }}
                        autoplay={true}
                        autoplayDirection
                        scrollEnabled
                        autoplayTimeout={4}
                    >
                        <View
                            style={styles.slide}
                            title={
                                <View style={[styles.homeBannerTextBox]}>
                                    <Text style={[styles.homeBannerText, css.zIndex5]} >
                                        <Text style={{ fontFamily: 'PoppinsSB' }}>At your service, on-demand!</Text> {"\n"}Making home services
                                        experts {"\n"}simple, reliable and affordable.{" "}
                                    </Text>
                                    <TouchableOpacity style={[styles.homeBannerButton]} onPress={() => props.navigation.navigate("GetgenieScreen")}>
                                        <Text style={[styles.homeBannerButtonText]}>BOOK NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        >
                            <Image resizeMode="contain" style={{ width: windowWidth, height: 200 }} source={require(imgPath + "home_slider1.jpg")} />
                        </View>
                        <View
                            style={styles.slide}
                            title={
                                <View style={[styles.homeBannerTextBox, css.zIndex1,]}>
                                    <Text style={[styles.homeBannerTextLaunch, css.zIndex5]}>NEW LAUNCHES</Text>
                                    <Text style={[styles.homeBannerText, css.zIndex5, { marginTop: 15 }]} >
                                        <Text style={{ fontFamily: 'PoppinsSB' }}>We're now LIVE in AbuDhabi.</Text> {"\n"}Get AED 25 OFF on first
                                        self service. HGSELF25{" "}
                                    </Text>
                                    <TouchableOpacity style={[styles.homeBannerButton]} onPress={() => props.navigation.navigate("GetgenieScreen")}>
                                        <Text style={[styles.homeBannerButtonText]}>BOOK NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        >
                            <Image resizeMode="contain" style={{ width: windowWidth, height: 200 }} source={require(imgPath + "home_slider2.jpg")} />
                        </View>
                        <View
                            style={styles.slide}
                            title={
                                <View style={styles.homeBannerTextBox}>
                                    <Text style={styles.homeBannerTextLaunch}>NEW LAUNCHES</Text>
                                    <Text style={styles.homeBannerText}>
                                        <Text style={{ fontFamily: 'PoppinsSB' }}>Launching COVID19 services</Text> {"\n"}Services you need in the
                                        safety and comfort {"\n"}of your home.{" "}
                                    </Text>
                                    <TouchableOpacity style={[styles.homeBannerButton]} onPress={() => props.navigation.navigate("GetgenieScreen")}>
                                        <Text style={styles.homeBannerButtonText}>BOOK NOW</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        >
                            <Image resizeMode="contain" style={{ width: windowWidth, height: 200 }} source={require(imgPath + "home_slider3.jpg")} />
                        </View>
                    </Swiper>
                </View>
                {infoBar ? (
                    <View style={([styles.infoBar])}>
                        <View style={([styles.textLeft], { width: "85%" })}>
                            <Text style={([styles.infoBarText])}>
                                <Text style={[css.fr, { textDecorationLine: 'underline', textDecorationColor: '#fff', fontSize: 10 }]} onPress={() => Linking.openURL('https://www.homegenie.com/en/covid-19-precautions')}>Learn more</Text> about the{" "}
                                <Text style={{ fontFamily: 'PoppinsSB', fontSize: 11 }}>COVID-19 measures</Text>{" "}
                                we’re taking to ensure the safety of our customers and us.
                            </Text>
                        </View>
                        <TouchableOpacity style={[styles.cancelButton, { paddingRight: 5 }]} onPress={() => setInfoBar(false)}>
                            <Text style={([styles.cancelButtonText], { color: "#fff", fontSize: 18, })}>x</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={[styles.section]}>

                </View>
                <View style={[styles.section]}>
                    <View style={[styles.mostPopular]}><Text style={[styles.mostPopularText]}>MOST POPULAR</Text></View>
                    <SwiperFlatList
                        autoplay={true}
                        autoplayDelay={3}
                        autoplayLoop={true}
                        data={props.hg.getPopularService}
                        keyExtractor={(item, index) => { return item._id; }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.child]} onPress={() => props.navigation.navigate('GetgenieScreen')}>
                                <Image style={styles.mostPopularImage} source={{ uri: item.imageURL, }} />
                                <Text style={styles.textFlat}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    >
                    </SwiperFlatList>
                </View>
                <View style={styles.screen}>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textLeft]}>
                            Service Categories
                        </Text>
                        <View style={[css.flexDRSB, css.imgFull]}>
                            <TouchableOpacity
                                style={[styles.imageContainer, css.width50]}
                                //onPress={() => props.navigation.navigate("CategoryPage", { catName: 'dailyutilities', })}
                                onPress={() => props.navigation.navigate('GetgenieScreen')}
                            >
                                <Image source={require(imgPath + "Handyman.png")} style={[styles.backgroundImage, css.img95,]} />
                                <View style={styles.overlay} />
                                <Text style={styles.serviceTitle}>DAILY {"\n"}UTILITIES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.imageContainer, css.width50]}
                                //onPress={() => props.navigation.navigate("CategoryPage", { catName: 'healthandwellness', })}
                                onPress={() => props.navigation.navigate('GetgenieScreen')}
                            >
                                <Image
                                    source={require(imgPath + "pcr.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <View style={styles.overlay} />
                                <Text style={styles.serviceTitle}>Health & {"\n"}Wellness</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[css.flexDRSB, css.imgFull]}>
                            <TouchableOpacity
                                style={[styles.imageContainer, css.width50]}
                                //onPress={() => props.navigation.navigate("CategoryPage", {  catName: 'lifestyledecor', })}
                                onPress={() => props.navigation.navigate('GetgenieScreen')}
                            >
                                <Image
                                    source={require(imgPath + "Lifestyle.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <View style={styles.overlay} />
                                <Text style={styles.serviceTitle}>Lifestyle {"\n"}& Decor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.imageContainer, css.width50]}
                                //onPress={() => props.navigation.navigate("CategoryPage", { catName: 'others', })}
                                onPress={() => props.navigation.navigate('GetgenieScreen')}
                            >
                                <Image
                                    source={require(imgPath + "pet_groom.png")}
                                    style={[styles.backgroundImage, css.img95]}
                                />
                                <View style={styles.overlay} />
                                <Text style={styles.serviceTitle}>Others</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textLeft]}>Offers & Promos</Text>
                        <SwiperFlatList
                            autoplay={true}
                            style={{ width: windowWidth, height: 210 }}
                            autoplayDelay={3}
                            autoplayLoop={true}
                            data={props.hg.getOffers}
                            keyExtractor={(item, index) => {
                                return item._id;
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.swiperOffer, { height: 200, width: windowWidth, marginTop: 10 }]}
                                    onPress={() => props.navigation.navigate('GetgenieScreen')}
                                >
                                    <Image
                                        key={item._id}
                                        style={[styles.swiperOfferImage]}
                                        source={{
                                            uri: item.image,
                                        }}
                                    />
                                    <View style={{ position: 'absolute', top: 3, left: 20, width: 150, height: 25, backgroundColor: '#f6b700', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[css.fm, css.whiteC, css.f10]}>{item.soldCount} claimed already! </Text>
                                    </View>
                                    {item.trending ? <Image
                                        style={{ top: -15, right: 25, position: 'absolute', }}
                                        source={require(imgPath + "trending.png")}
                                    /> : null}
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textCenter, css.fsb]}>
                            Specialized services
                        </Text>
                        <Text style={[styles.homeTitlesSub, styles.textCenter, css.fr]}>
                            Handpicked services from innovated brands. Now available!
                        </Text>
                        <View style={[styles.specialServiceAll]}>
                            <FlatList
                                data={specializedData}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <View>
                                        <Pressable
                                            style={{
                                                borderBottomWidth: 10,
                                                borderColor: "#2eb0e4",
                                                borderRadius: 10,
                                                marginTop: 10,
                                            }}
                                            onPress={() => toggleoverlaySpecial()}
                                        >
                                            <ImageBackground

                                                source={{
                                                    uri: item.image,
                                                }}
                                                style={{
                                                    height: 250,
                                                }}
                                                imageStyle={{
                                                    resizeMode: 'cover',
                                                    borderRadius: 0,
                                                    width: '160%',
                                                    justifyContent: 'flex-start',
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                }}
                                            ></ImageBackground>
                                            {overlaySpecial ?
                                                <View style={[styles.overlaySpecial, css.alignCenter]}
                                                    onPress={() => toggleoverlaySpecial()}
                                                >
                                                    <Pressable
                                                        style={[css.yellowBG, css.alignCenter, css.borderRadius30, { width: 120, height: 30 }]}
                                                        onPress={() => props.navigation.navigate("GetgenieScreen")}
                                                    >
                                                        <Text style={[css.fsb, css.f12, css.whiteC]}>BOOK NOW</Text>
                                                    </Pressable>
                                                </View>
                                                :
                                                null
                                            }
                                        </Pressable>
                                        <Text style={styles.textSpecialService}>
                                            {item.subCategoryName}
                                        </Text>
                                    </View>
                                )}
                            />
                            <FlatList
                                data={specializedData2}
                                keyExtractor={(item, index) => {
                                    return item._id;
                                }}
                                renderItem={({ item }) => (
                                    <Pressable style={[styles.specialserviceSecond, { marginTop: 20 }]}
                                        onPress={() => toggleoverlaySpecial2()}>
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
                                                    borderRadius: 0,
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    resizeMode: "cover",
                                                }}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            />
                                            {overlaySpecial2 ?
                                                <View style={[styles.overlaySpecial, css.alignCenter]}
                                                    onPress={() => toggleoverlaySpecial2()}
                                                >
                                                    <Pressable
                                                        style={[css.yellowBG, css.alignCenter, css.borderRadius30, { width: 120, height: 30 }]}
                                                        onPress={() => props.navigation.navigate("GetgenieScreen")}
                                                    >
                                                        <Text style={[css.fsb, css.f12, css.whiteC]}>BOOK NOW</Text>
                                                    </Pressable>
                                                </View>
                                                :
                                                null
                                            }
                                        </View>
                                        <Text style={styles.textSpecialService}>
                                            {item.subCategoryName}
                                        </Text>
                                    </Pressable>
                                )}
                            />
                            <View style={[styles.specialserviceThird, { alignItems: 'center', justifyContent: 'space-between' }]}>
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
                                        <Pressable onPress={() => toggleoverlaySpecial3()}>
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
                                                        style={[styles.specialserviceThirdImage, {
                                                            width: "100%",
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                            resizeMode: 'cover'
                                                        }]}
                                                        source={{
                                                            uri: item.image,
                                                        }}
                                                    />
                                                    {overlaySpecial3 ?
                                                        <View style={[styles.overlaySpecial, css.alignCenter]}
                                                            onPress={() => toggleoverlaySpecial3()}
                                                        >
                                                            <Pressable
                                                                style={[css.yellowBG, css.alignCenter, css.borderRadius30, { width: 100, height: 30 }]}
                                                                onPress={() => props.navigation.navigate("GetgenieScreen")}
                                                            >
                                                                <Text style={[css.fsb, css.f12, css.whiteC]}>BOOK NOW</Text>
                                                            </Pressable>
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                                <Text style={styles.textSpecialService}>
                                                    {item.subCategoryName}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )}
                                >
                                </SwiperFlatList>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.homeTitles, styles.textCenter]}>
                            HomeGenie Happiness Warranty
                        </Text>
                        <View style={styles.flexRow}>
                            <Image
                                source={require(imgPath + "hgWarranty.png")}
                                style={styles.warrantyImage}
                            />
                            <Text style={[styles.content]}>
                                All service bookings are covered with at least an <Text style={[css.fsb, css.f12, css.blackC]}> AED 1000 </Text>
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
                                        source={require(imgPath + "expert.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>
                                        Expert {"\n"} professionals
                                    </Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require(imgPath + "priceverification.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>Great {"\n"} prices</Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require(imgPath + "oneshop.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>One-stop {"\n"} shop</Text>
                                </View>
                            </View>
                            <View style={styles.flexRowSpace}>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require(imgPath + "qualityControl.png")}
                                        style={styles.alignCenter}
                                    />
                                    <Text style={styles.whyContent}>
                                        Enabling {"\n"} technology
                                    </Text>
                                </View>
                                <View style={styles.whyHomegenieImage}>
                                    <Image
                                        source={require(imgPath + "customerService.png")}
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
                                <Image source={require(imgPath + "gulfNews.png")} />
                                <Image source={require(imgPath + "khaleejTimes.png")} />
                                <Image source={require(imgPath + "theNational.png")} />
                            </View>
                            <View style={styles.space10}></View>
                            <View style={styles.flexRowSpace}>
                                <Image source={require(imgPath + "business.png")} />
                                <Image source={require(imgPath + "247.png")} />
                                <Image source={require(imgPath + "forbes.png")} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.flexRowSpace}>
                            <View style={[css.alignSelfC]}>
                                <Text style={styles.needHelpText}>Need Help?</Text>
                            </View>
                            <Whatsapp />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 0,
    },
    section: {
        padding: 20,
        paddingBottom: 0
    },
    textCenter: {
        textAlign: "center",
    },
    textLeft: {
        textAlign: "left",
    },
    homeTitles: {
        color: "#2EB0E4",
        textTransform: "uppercase",
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'PoppinsSB',
    },
    homeTitlesSub: {
        fontSize: 12,
        color: "grey",
    },
    mostPopular: {
        marginBottom: 10,
        backgroundColor: "#f6b700",
        width: 100,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    mostPopularText: { fontFamily: 'PoppinsBO', color: '#fff', fontSize: 10, textTransform: "uppercase", },
    flexRow: {
        flexDirection: "row",
    },
    flexRowSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageContainer: {
        width: "50%",
        height: 120,
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
        bottom: 10,
        left: 15,
        color: "#fff",
        fontSize: 16,
        fontFamily: 'PoppinsEB',
        textTransform: "uppercase",
    },
    content: {
        textAlignVertical: "center",
        fontSize: 12,
        flex: 1,
        color: '#525252',
        paddingLeft: 10,
        fontFamily: 'PoppinsM',
    },
    whyContent: {
        textAlignVertical: "bottom",
        fontSize: 11,
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'PoppinsM',
        color: '#525252',
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
        fontFamily: 'PoppinsSB'
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
        textTransform: "uppercase",
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#525252",
        fontFamily: 'PoppinsSB'
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
        backgroundColor: "#00000080",
        height: 60,
        width: windowWidth,
        flex: 1,
        position: "absolute",
        bottom: 33,
        right: 0,
        left: 0,
        elevation: 0,
        zIndex: 1,
    },
    homeBannerTextLaunch: {
        backgroundColor: "#fff",
        position: "absolute",
        left: 10,
        bottom: 50,
        padding: 3,
        fontSize: 9,
        color: "#525252",
        fontFamily: 'PoppinsSB',
        borderRadius: 3
    },
    homeBannerText: { marginTop: 10, color: "#fff", fontSize: 10, left: 10, fontFamily: 'PoppinsR' },
    homeBannerButton: {
        height: 30,
        width: 110,
        backgroundColor: "#f6b700",
        position: "absolute",
        bottom: 20,
        right: 10,
        padding: 5,
        //flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        zIndex: 9,
    },
    homeBannerButtonText: {
        color: "#fff",
        fontSize: 11,
        fontFamily: 'PoppinsM',
    },
    infoBar: { backgroundColor: "#f6b700", padding: 10, marginTop: -3, flexDirection: "row", justifyContent: "space-between", },
    infoBarText: { fontSize: 10, color: "#fff", letterSpacing: 0.1, fontFamily: 'PoppinsR' },
    child: {
        borderRadius: 10,
        //borderColor: "grey",
        //padding: 2,
        width: 85,
        height: 85,
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
        fontSize: 11,
        bottom: 5,
        position: 'absolute',
        color: "#525252",
        textAlign: "center",
        fontFamily: 'PoppinsM'
    },
    mostPopularImage: {
        height: 35,
        width: 35,
        marginBottom: 15,
    },
    textSpecialService: {
        textAlign: "center",
        fontSize: 10,
        color: "#525252",
        marginTop: 5,
        textTransform: "uppercase",
        fontFamily: 'PoppinsSB',
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(61, 61, 61, 0.48)',
        borderRadius: 10,
        width: '95%',
    },
    overlaySpecial: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#21adea',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        opacity: 0.8,
    }
});

const mapStateToProps = (state) => ({
    hg: state.hg,
    error: state.error
})

export default connect(mapStateToProps, { getOffers, getPopularService, getCity, getSearch, getSpecialized })(HomeScreen);