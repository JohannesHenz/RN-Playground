// src/SwiperScreen.tsx
import React, { useCallback, useRef, useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/RootStackParamList";

// Helper functions (move these if they are only used here, otherwise keep global helpers)
function* range(start: number, end: number): Generator<number, void, undefined> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

type CardData = number;

interface DeckSwiperRef<T> {
    swipeLeft: () => void;
    swipeRight: () => void;
    swipeBack: () => void;
    jumpToCard: (index: number) => void;
}

const SwiperScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [cards, setCards] = useState<CardData[]>(() => [...range(1, 10)]);
    const [rightSwipedCards, setRightSwipedCards] = useState<CardData[]>([]);
    const [leftSwipedCards, setLeftSwipedCards] = useState<CardData[]>([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [swipedAllCards, setSwipedAllCards] = useState(false);
    const swiperRef = useRef<Swiper<CardData>>(null);
    const lastSwipeDirectionRef = useRef<'left' | 'right' | null>(null);


    const onSwiped = useCallback((index: number) => {
        setCardIndex(index + 1);
    }, []);

    const onSwipedBack = useCallback((index: number)=> {
        setCardIndex(index);
        setSwipedAllCards(false);

        const lastDirection = lastSwipeDirectionRef.current;
        if (lastDirection === 'right') {
            setRightSwipedCards(prevCards=> prevCards.slice(0, -1));
        } else if (lastDirection === 'left') {
            setLeftSwipedCards(prevCards=> prevCards.slice(0, -1));
        } else {
            if (rightSwipedCards.length > leftSwipedCards.length) {
                setRightSwipedCards(prevCards=> prevCards.slice(0, -1));
            } else if (leftSwipedCards.length > 0) {
                setLeftSwipedCards(prevCards=> prevCards.slice(0, -1));
            }
        }
        lastSwipeDirectionRef.current = null;
    }, [leftSwipedCards.length, rightSwipedCards.length]);


    const onSwipedRight = useCallback((index: number) =>{
        const swipedCard = cards[index];
        console.log(`Card swiped right: ${swipedCard}`);
        setRightSwipedCards(prevCards => [...prevCards, swipedCard]);
        setCardIndex(index + 1);
        lastSwipeDirectionRef.current = 'right';
    }, [cards]);

    const onSwipedLeft = useCallback((index: number)=>{
        const swipedCard = cards[index];
        setLeftSwipedCards(prevCards => [...prevCards, swipedCard]);
        setCardIndex(index + 1);
        lastSwipeDirectionRef.current = 'left';
        }, [cards]);

    const onSwipedAll = useCallback(()=>{
        console.log('All Cards Swiped!');
        setSwipedAllCards(true);
    }, []);

    const onTapCard = useCallback(()=>{
        navigation.navigate('LandingScreen');
    }, [navigation]);

    const renderCard = (card: number, index: number) => {
        return (
            <View style={styles.card}>
                <Text style={styles.text}>Left Swiped: {leftSwipedCards.length} - Right Swiped: {rightSwipedCards.length}</Text>
                <Text style={styles.cardIndexText}>Current Card Index: {index} (Data: {card})</Text>
            </View>
        )
    }

    const swipeBack = useCallback(()=>{
        if (swiperRef.current) {
            (swiperRef.current as unknown as DeckSwiperRef<CardData>).swipeBack();
        }
    },[]);

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <Swiper
                ref={swiperRef}
                onSwiped={onSwiped}
                onSwipedLeft={onSwipedLeft}
                onSwipedRight={onSwipedRight}
                // onSwipedBack={onSwipedBack}
                onTapCard={onTapCard}
                cards={cards}
                cardIndex={cardIndex}
                cardVerticalMargin={80}
                cardHorizontalMargin={35}
                renderCard={renderCard}
                onSwipedAll={onSwipedAll}
                stackSize={3}
                stackSeparation={15}
                backgroundColor={'#4FD0E9'}
                verticalSwipe={false}
                animateOverlayLabelsOpacity
                animateCardOpacity
                swipeBackCard
                overlayLabels={{ // Added overlayLabels from your previous code
                    left: { title: 'NOPE', style: { label: { backgroundColor: 'black', borderColor: 'black', color: 'white', borderWidth: 1 }, wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 } } },
                    right: { title: 'LIKE', style: { label: { backgroundColor: 'black', borderColor: 'black', color: 'white', borderWidth: 1 }, wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 } } },
                }}
            >
            </Swiper>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity onPress={swipeBack} style={styles.styledButton}>
                    <Text style={styles.buttonText}>Swipe Back</Text>
                </TouchableOpacity>
            </View>
            {swipedAllCards && (
                <View style={styles.doneContainer}>
                    <Text style={styles.done}>All cards swiped!</Text>
                    <Text style={styles.done}>Right Swiped Cards: {JSON.stringify(rightSwipedCards)}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flex: 1,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.6,
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        backgroundColor: 'transparent',
        color: '#333',
        padding: 10,
    },
    cardIndexText: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 14,
        color: '#666',
    },
    bottomButtonContainer: {
        width: '100%',
        bottom: Dimensions.get('window').height * 0.1,
        paddingHorizontal: 20,
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1
    },
    styledButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    doneContainer: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        zIndex: 100,
        alignItems: 'center',
    },
    done: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'transparent'
    }
});

export default SwiperScreen;