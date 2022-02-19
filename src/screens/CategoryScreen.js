import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Button,
    Image,
    ViewBase,
    Linking,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import Text from "../components/MyText";
import SocialMedia from "../components/socialMedia";
import Whatsapp800 from "../components/whtsApp";
import StatusBarAll from "../components/StatusBar";
import css from "../components/commonCss";
let imgPath = '@assets/icons/';
let imgPathImage = '@assets/icons/images/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dailyImage = '@assets/icons/Handyman2x.png'
const healthImage = '@assets/icons/Health2x.png'
const lifeImage = '@assets/icons/Lifestyle2x.png'
const otherImage = '@assets/icons/Others2x.png'


export default function CategoryScreen({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const { catName } = route.params;
    const dailyImage = '@assets/icons/Handyman2x.png'
    const healthImage = require('@assets/icons/pcr.png')
    const lifeImage = require('@assets/icons/Lifestyle2x.png')
    const otherImage = require('@assets/icons/pet_groom.png');

    const getCategory = async () => {
        try {
            const response = await fetch('https://api.homegenie.com/api/webapi/getServiceGroup?city=Dubai&language=en');
            const json = await response.json();
            let datas = json.data;
            datas = datas.filter(x => x.category === catName);
            //console.log('datas Daily', datas);
            let catNames = [];
            let subCatNames = [];
            let catNames2 = [];
            let catNames3 = [];
            let catNames4 = [];
            for (obj of datas) {
                catNames.push({
                    _id: obj._id,
                    catName: obj.categoryName,
                })
                for (obj2 of obj.categoryIds) {
                    subCatNames.push({
                        cid: obj2._id,
                        image: obj2.imageURL.thumbnail,
                        subcatName: obj2.name,
                        popular: obj2.isPopular
                    })
                }
            }
            setCategoryData(subCatNames);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getCategory();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF7FC" }}>
            <View style={css.header}>
                <View style={styles.flexRow}>
                    <TouchableOpacity
                        style={[styles.textWhite, styles.backButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            resizeMode="contain"
                            style={{}}
                            source={require("@assets/icons/backArrow.png")}
                        />
                    </TouchableOpacity>
                    {/* <Text style={[styles.headerTitle]}>{catName}</Text> */}
                    {catName == 'dailyutilities' ? <Text style={[styles.headerTitle]}>Daily Utilities</Text>
                        : catName == 'healthandwellness' ? <Text style={[styles.headerTitle]}>Health & Wellness</Text>
                            : catName == 'lifestyledecor' ? <Text style={[styles.headerTitle]}>Lifestyle & Decor</Text>
                                : catName == 'others' ? <Text style={[styles.headerTitle]}>Others</Text>
                                    : <Text style={[styles.headerTitle]}>Others</Text>
                    }
                </View>
            </View>
            <ScrollView style={styles.ScrollView}>
                <View style={[styles.screen]}>
                    <View style={[styles.section]}>
                        <View style={[styles.categoryTitleImage]}>
                            {catName == 'dailyutilities' ? <Image
                                style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                source={require('@assets/icons/Handyman2x.png')}
                            />
                                : catName == 'healthandwellness' ? <Image
                                    style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                    source={require('@assets/icons/Health2x.png')}
                                />
                                    : catName == 'lifestyledecor' ? <Image
                                        style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                        source={lifeImage}
                                    />
                                        : catName == 'others' ? <Image
                                            style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                            source={otherImage}
                                        />
                                            : <Image
                                                style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                                source={otherImage}
                                            />
                            }
                            {/* <Image
                                style={([], { width: "100%", height: 250, borderRadius: 20 })}
                                source={require(healthImage)}
                            /> */}
                        </View>
                    </View>
                    <View style={[styles.section]}>
                        <View style={[styles.categoryservices,]}>
                            {isLoading ?
                                <View><Text>Loading..</Text></View>
                                :
                                <FlatList
                                    style={{}}
                                    numColumns={3}
                                    columnWrapperStyle={{ flex: 1 / 3, justifyContent: 'flex-start' }}
                                    data={categoryData}
                                    keyExtractor={(item, index) => {
                                        return item.cid;
                                    }}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity style={[styles.child,]} onPress={() => navigation.navigate("GetGenie")}>
                                                {item.popular ? <View style={[styles.servicePopular]}><Text style={[styles.servicePopularText]}>POPULAR</Text></View> : null}
                                                <Image
                                                    style={[styles.categoryServiceImage]}
                                                    source={{
                                                        uri: item.image,
                                                    }}
                                                />
                                                <Text style={[styles.textFlat]}>{item.subcatName}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            }
                        </View>
                        <View style={[styles.categoryservices, css.flexDRSB, { flexWrap: 'wrap' }]}>
                            {/* <View style={[styles.child]}>
                                <View style={[styles.servicePopular]}><Text style={[styles.servicePopularText]}>POPULAR</Text></View>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_D2EwwBi571f8fef784f3f9e7f2779c3.png",
                                    }}
                                />
                                <Text style={[styles.textFlat]}>AC</Text>
                            </View>
                            <View style={[styles.child]}>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_0lsFbZH571f8fef784f3f9e7f2779ad.png",
                                    }}
                                />
                                <Text style={styles.textFlat}>Electrical</Text>
                            </View>
                            <View style={[styles.child]}>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_tG8tUwa571f8fef784f3f9e7f277996.png",
                                    }}
                                />
                                <Text style={styles.textFlat}>Plumbing</Text>
                            </View>
                            <View style={[styles.child]}>
                                <View style={[styles.servicePopular]}><Text style={[styles.servicePopularText]}>POPULAR</Text></View>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_l10dApL571f8ff0784f3f9e7f2779f1.png",
                                    }}
                                />
                                <Text style={[styles.textFlat]}>Handyman</Text>
                            </View>
                            <View style={[styles.child]}>
                                <View style={[styles.servicePopular]}><Text style={[styles.servicePopularText]}>POPULAR</Text></View>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_UMVcTe9571f8ff0784f3f9e7f277a4a.png",
                                    }}
                                />
                                <Text style={styles.textFlat}>Appliances</Text>
                            </View>
                            <View style={[styles.child]}>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_N4ZIxAn571f8ff0784f3f9e7f277a38.png",
                                    }}
                                />
                                <Text style={styles.textFlat}>Gardening</Text>
                            </View>
                            <View style={[styles.child]}>
                                <View style={[styles.servicePopular]}><Text style={[styles.servicePopularText]}>POPULAR</Text></View>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_YMhhaJG571f8ff0784f3f9e7f277a66.png",
                                    }}
                                />
                                <Text style={[styles.textFlat]}>Technology</Text>
                            </View>
                            <View style={[styles.child]}>
                                <Image
                                    style={[styles.categoryServiceImage]}
                                    source={{
                                        uri: "https://iesoft.nyc3.cdn.digitaloceanspaces.com/homegenie/thumb_wegK2Ia5f1666ed174db52a6991292f.png",
                                    }}
                                />
                                <Text style={styles.textFlat}>Gadgets</Text>
                            </View> */}
                            <TouchableOpacity style={[styles.child, styles.childRemove]} onPress={() => navigation.goBack()}>
                                <Image
                                    style={[styles.categoryServiceImage], { width: 20, height: 20 }}
                                    source={require('@assets/icons/forwardArrow.png')}
                                />
                                <Text style={styles.textFlat}>Back</Text>
                            </TouchableOpacity>
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
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    section: {
        padding: 20,
    },
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        width: "100%",
        height: 120,
        paddingTop: 36,
        paddingLeft: 20,
        backgroundColor: "#2eb0e4",
        justifyContent: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: "#52006A",
        color: "#fff",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 18,
        textTransform: "uppercase",
    },
    flexRow: {
        flexDirection: "row",
    },
    flexRowSpace: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textWhite: {
        color: "#fff",
    },
    backButton: {
        marginRight: 10,
        justifyContent: "center",
    },
    bgLiteBlue: {
        backgroundColor: "#eff7fc",
    },
    flexDirectionColumn: {
        flexDirection: "column",
    },
    padding10: {
        padding: 10,
    },
    padding20: {
        padding: 20,
    },
    padding30: {
        padding: 30,
    },
    needHelpText: {
        color: "#2EB0E4",
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 10,
    },
    child: {
        borderRadius: 10,
        borderColor: "grey",
        padding: 5,
        paddingTop: 0,
        width: 90,
        height: 100,
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
        alignItems: "center",
        justifyContent: 'center',
    },
    childRemove: {
        backgroundColor: "transparent",
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    categoryservices: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'
    },
    servicePopular: { backgroundColor: '#f6b700', alignItems: 'center', width: '70%', padding: 2, position: 'absolute', top: 0 },
    servicePopularText: { color: '#fff', fontSize: 8 },
    textFlat: { fontSize: 10, fontWeight: 'bold', bottom: 10, position: 'absolute', color: '#303030' },
    categoryServiceImage: { height: 40, width: 40, justifyContent: 'center', alignItems: 'center' },
});