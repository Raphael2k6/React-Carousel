import React, { Component } from 'react';
import './App.css'


const pics = [
    <img heigth="500" width="400" src="./image1.jpg" alt="image1" />,
    <img heigth="500" width="400" src="./image2.jpg" alt="image1" />,
    <img heigth="500" width="400" src="./image5.jpg" alt="image1" />
]

class Carousel extends Component {
    constructor(props) {
        super(props);
        const idxStart = 0;

        this.transitionSlide = this.transitionSlide.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
            current: idxStart,
            prev: this.getPrevIndex(idxStart),
            next: this.getNextIndex(idxStart),
            Text: Text
        };
        // To disable autoplay, change to false 
        this.autoPlay = true;
    }

    getPrevIndex(idx) {
        if (idx <= 0) {
            return pics.length - 1;
        }
        return idx - 1;
    }

    getNextIndex(idx) {
        if (idx >= pics.length - 1) {
            return 0;
        }
        return idx + 1;
    }

    setIndexes(idx, dir) {
        this.setState({
            current: idx,
            prev: this.getPrevIndex(idx),
            next: this.getNextIndex(idx),
            dir
        });
    }


    transitionSlide(direction) {
        if (this.moving) return;
        // start animation
        this.setState({
            dir: direction,
            move: true
        });
        this.moving = true;

        // stop animation
        setTimeout(() => {
            this.setState({
                move: false
            });
            if (direction === 'next') {
                this.setIndexes(this.getNextIndex(this.state.current), 'next');
            } else {
                this.setIndexes(this.getPrevIndex(this.state.current), 'prev');
            }
            this.moving = false;
        }, 500);

    }

    componentDidMount() {
        if (this.autoPlay) {
            setInterval(this.handleNext, 5000);
        }
    }

    handlePrev() {
        this.transitionSlide('prev');
    }

    handleNext() {
        this.transitionSlide('next');
    }
    render() {
        return (
            <div className="carousel">
                <div className={this.state.move ? 'move' : ''}>
                    {pics[this.state.index] === pics.legnth ? pics[this.state.next] : null}
                </div>
                <div className="indicatorContainer">
                    {[...Array(pics.length).keys()].map((idx) => {
                        return (
                            <span
                                onClick={this.handleNext}
                                className={(this.state.current === idx) ? 'indicator active' : 'indicator'}
                                >
                            </span>
                        )
                    })}
                </div>
                <div>
                    <button onClick={this.handleNext}>Prev</button>
                    <button onClick={this.handleNext}>Next</button>
                </div>
            </div>
        )
    }
}

export default Carousel;

