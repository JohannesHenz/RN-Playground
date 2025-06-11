import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { Button, StyleSheet, Text, View } from 'react-native';

// 1. Define Interfaces for Component Props and State
interface ExampleProps {} // No props are being passed to this component in the example
interface ExampleState {
    cards: number[];
    swipedAllCards: boolean;
    swipeDirection: string;
    cardIndex: number;
}

// 2. Define a type for the Swiper ref's imperative methods
//    This is an interface that matches the methods you plan to call on the ref.
interface DeckSwiperRef<T> {
    swipeLeft: () => void;
    swipeRight: () => void;
    swipeTop: () => void;
    swipeBottom: () => void;
    swipeBack: () => void;
    // Add other methods if you use them, e.g., jumpToCard
    jumpToCard: (index: number) => void;
    // The 'Swiper' component itself from 'react-native-deck-swiper'
    // can often be typed directly if you check the library's exports,
    // but this custom interface is a good fallback.
}

// 3. Type the generator function
function* range(start: number, end: number): Generator<number, void, undefined> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

// 4. Convert to a TypeScript Class Component
export default class Example extends Component<ExampleProps, ExampleState> {
    // 5. Type the ref to the Swiper component
    private swiper: DeckSwiperRef<number> | null = null; // Assuming cards are numbers

    constructor(props: ExampleProps) {
        super(props);
        // 6. Initialize state with type assertion or explicit typing
        this.state = {
            cards: [...range(1, 50)],
            swipedAllCards: false,
            swipeDirection: '',
            cardIndex: 0
        };
    }

    // 7. Type parameters for renderCard callback
    renderCard = (card: number, index: number): React.ReactElement => {
        return (
            <View style={styles.card}>
                <Text style={styles.text}>
                    {card} - {index}
                </Text>
            </View>
        );
    };

    // 8. Type parameters for onSwiped callback
    onSwiped = (type: string): void => {
        console.log(`on swiped ${type}`);
    };

    onSwipedAllCards = (): void => {
        this.setState({
            swipedAllCards: true
        });
    };

    swipeLeft = (): void => {
        // 9. Use optional chaining for ref calls to prevent errors if ref is null
        this.swiper?.swipeLeft();
    };

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={(swiper: Swiper<number> | null) => {
                        // Type the ref callback correctly
                        this.swiper = swiper as unknown as DeckSwiperRef<number>; // Type assertion to match your ref interface
                        // A safer approach might be to ensure DeckSwiperRef strictly matches Swiper's internal ref type.
                        // For react-native-deck-swiper, the ref itself is the component instance, which has these methods.
                        // So, `this.swiper = swiper;` might be sufficient if Swiper<T> type includes them.
                    }}
                    onSwiped={() => this.onSwiped('general')}
                    onSwipedLeft={() => this.onSwiped('left')}
                    onSwipedRight={() => this.onSwiped('right')}
                    onSwipedTop={() => this.onSwiped('top')}
                    onSwipedBottom={() => this.onSwiped('bottom')}
                    onTapCard={this.swipeLeft} // Using instance method
                    cards={this.state.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard} // Using instance method
                    onSwipedAll={this.onSwipedAllCards} // Using instance method
                    stackSize={3}
                    stackSeparation={15}
                    overlayLabels={{
                        bottom: {
                            title: 'BLEAH',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        },
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        },
                        top: {
                            title: 'SUPER LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                >
                    {/* 10. Use optional chaining for ref calls */}
                    <Button onPress={() => this.swiper?.swipeBack()} title="Swipe Back" />
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    }
});
