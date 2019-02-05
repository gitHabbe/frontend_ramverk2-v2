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
        try {
            const kmomData = await axios.get(`http://localhost:8333/reports/${this.state.kmom}`);
            this.setState({ kmomData });
        } catch (error) {
            console.log('TCL: Report -> }catch -> error', error);
            // Ugly slution but it works for now
            this.setState({
                kmomData: {
                    data: {
                        kmomData: { kmom: this.state.kmom, report: "No report yet"}
                    }
                }
            });
        }
    }
    
    async componentDidUpdate(prevProps) {
        const prevNum = prevProps.match.params.num;
        const curNum = this.props.match.params.num;
        if (prevNum !== curNum) {
            // const kmomData = await axios.get(`http://localhost:8333/reports/${curNum}`);
            // this.setState({ kmomData });
            try {
                const kmomData = await axios.get(`http://localhost:8333/reports/${curNum}`);
                this.setState({ kmomData });
            } catch (error) {
                console.log('TCL: Report -> }catch -> error', error);
                // Ugly slution but it works for now
                this.setState({
                    kmomData: {
                        data: {
                            kmomData: { kmom: curNum, report: "No report yet"}
                        }
                    }
                });
            }
        }
    }

    render() {
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
