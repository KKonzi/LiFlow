import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import DayCard from './DayCard.js';

const monthToString = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};

export default class MonthlyAgenda extends Component {
    constructor(props) {
        super(props);

        let nowDate = new Date();
        this.state = {
            focusYear: nowDate.getFullYear(),
            focusMonth: nowDate.getMonth()+1,
            items: {}
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topNav}>
                    <View>
                        <TouchableOpacity
                            onPress={() => console.log('touch',this)}
                            underlayColor='rgba(255,255,255,0.9)'
                        >
                            <Image
                                source={require('../asset/menu.png')}
                                style={styles.topNavIcon}
                                width={25} height={25}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topNavDate}>
                        <Text style={styles.topNavDateYear}>{this.state.focusYear}</Text>
                        <Text style={styles.topNavDateMonth}>{monthToString[this.state.focusMonth]}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => console.log('touch',this)}
                            underlayColor='rgba(255,255,255,0.9)'
                        >
                            <Image
                                source={require('../asset/search.png')}
                                style={styles.topNavIcon}
                                width={28} height={28}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    markedDates={{}}

                    pastScrollRange={20}
                    futureScrollRange={20}

                    onDayPress={(day) => {
                        if(this.state.focusYear !== day.year) this.state.focusYear = day.year;
                        if(this.state.focusMonth !== day.month) this.state.focusMonth = day.month;
                    }}
                    onDayChange={(day) => {
                        if(this.state.focusYear !== day.year) this.state.focusYear = day.year;
                        if(this.state.focusMonth !== day.month) this.state.focusMonth = day.month;
                    }}

                    theme={{
                        agendaTodayColor: '#99BDDD'
                    }}
                />
            </View>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [{
                        name: 'Item for ' + strTime,
                        height: 80
                    }];
                }
            }

            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <View style={[styles.dayCard, {height: item.height}]}>
                <DayCard
                    thumbURI='http://image.toast.com/aaaaaxg/images/20190720_150746_128x128.jpg'
                    imageTag="#America #Sanfrancisco #Sanjose #Coffee"/>
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 35
    },

    topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 65,
        // backgroundColor: 'lightgrey',
    },

    topNavDate: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    topNavDateYear: {
        fontWeight: '500',
        marginBottom: -8,
        color: '#2B2B2B'
    },
    topNavDateMonth: {
        fontSize: 48,
        color: '#99BDDD',
        fontWeight: '700'
    },

    topNavIcon: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    dayCard: {
        backgroundColor: 'white',
        flex: 1,
        flexWrap: 'wrap',
        borderRadius: 5,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
});
