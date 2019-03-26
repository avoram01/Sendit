import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovementTracker from './MovementTracker';
import BodyProfile from './BodyProfile';
import Register from './Register';
import setGoals from './setGoals';
import Goals from './goals';
import Food_sugg from './Food_sugg';
import FoodList from './FoodList';
import Swiper from 'react-native-swiper';

class SwipeNavigator extends React.Component {
	render() {
	    const styles = StyleSheet.create({
	      container: {
	        flex: 1,
	        backgroundColor: '#fff',
	        alignItems: 'center',
	        justifyContent: 'center',
	      }});

		return (
			<Swiper
			loop={false}
			showsPagination={true}
			index={0}>
				<View>
					<Goals />
				</View>

				<View style={styles.container}>
					<FoodList />
				</View>

				<View>
					<Food_sugg />
				</View>

				<View>
					<BodyProfile />
				</View>

				<View style={styles.container}>
					<MovementTracker />
				</View>

			</Swiper>
		)
	}
}

export default SwipeNavigator;