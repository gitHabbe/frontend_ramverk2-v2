import React, { Component } from 'react';
import axios from 'axios';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmom: this.props.match.params.num,
            kmomData: {}
        }
    }

    async componentDidMount() {
        const kmomData = await axios.get(`http://localhost:8333/reports/${this.state.kmom}`);
        this.setState({ kmomData });
        console.log("CDM");
    }

    render() {
        console.log("render()");
        console.log("this.state.kmomData", this.state.kmomData);
        return (
            <div className="container">
                <section className="hero is-primary">
                    <div className="hero-body">
                        <h1 className="title">
                            {
                                this.state.kmomData.data
                                ? this.state.kmomData.data.kmomData.kmom
                                : "Loading kmom..."
                            }
                        </h1>
                        <h2 className="subtitle">
                            This is my report for {this.state.kmom}
                        </h2>
                    </div>
                </section>
                <div className="content">
                    <p className="reportText">
                        {
                            this.state.kmomData.data
                            ? this.state.kmomData.data.kmomData.report
                            : "Loading report..."
                        }
                    </p>
                </div>
            </div>
        );
    }
}

export default Report;