import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class MonthlyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onDayPress = this.onDayPress.bind(this);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Calendar
                    current={'2012-05-16'}
                    minDate={'2012-05-10'}
                    maxDate={'2012-05-29'}
                    onDayPress={this.onDayPress}
                    style={styles.calendar}
                    hideExtraDays
                    markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
                    onPressArrowLeft={substractMonth => substractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                />
            </ScrollView>
        );
    }

    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}

const styles = StyleSheet.create({
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 330
    },
    container: {
        flex: 1,
    }
});