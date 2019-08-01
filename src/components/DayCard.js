import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class DayCard extends Component {
    static defaultProps = {
        thumbURI: '../asset/menu.png',
        imageTag: 'defaultProps'
    };

    render() {
        const thumbURI = this.props.thumbURI;
        const imageTag = this.props.imageTag;
        return (
            <View style={styles.dayCard}>
                <Image
                    source={{uri:thumbURI}}
                    style={styles.dayCardImage}
                />
                <View style={styles.dayCardTag}>
                    <Text style={styles.dayCardTagText}>
                        {imageTag}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dayCard: {
        flexDirection: 'row',
        // justifyContent: 'center',
        width: '100%',
        flexWrap: 'wrap',

    },
    dayCardImage: {
        width: 60,
        height: 60,
        margin: 10,
        borderRadius: 5
    },
    dayCardTag: {
        flex:1,
        margin: 10,
        marginLeft: 0,
        justifyContent: 'center'
        // wordBreak: 'break-word'
    },
    dayCardTagText: {

    }
});
