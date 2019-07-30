import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

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
            focusMonth: monthToString[nowDate.getMonth()+1],
            items: {}

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topNav}>
                    <Text style={styles.topNavYear}>{this.state.focusYear}</Text>
                    <Text style={styles.topNavMonth}>{this.state.focusMonth}</Text>
                </View>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    markedDates={{}}

                    onDayPress={(day) => {
                        this.state.focusYear = day.year;
                        this.state.focusMonth = monthToString[day.month];
                    }}
                    onDayChange={(day) => {
                        this.state.focusYear = day.year;
                        this.state.focusMonth = monthToString[day.month];
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
                    this.state.items[strTime] = [];
                    const numItems = 1;
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: 80
                        });
                    }
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
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: 65,
        // backgroundColor: 'lightgrey',
    },
    topNavYear: {
        fontWeight: '500',
        marginBottom: -8
    },
    topNavMonth: {
        fontSize: 48,
        color: '#99BDDD',
        fontWeight: '700'
    },

    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});
