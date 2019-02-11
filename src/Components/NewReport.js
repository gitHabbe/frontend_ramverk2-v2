import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class NewReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmomNum: "",
            report: "",
            content: "",
            writer: "",
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
    }

    
    
    onChange = e => this.setState({[e.target.name]: e.target.value});

    async componentDidMount() {
        console.log(localStorage.getItem("jwtToken"));
        const isOuth = await axios.get(`${process.env.REACT_APP_API_URL}/jwt_outh`, {
            headers: {
                // 'Content-Type': "application/x-www-form-urlencoded",
                'x-access-token': localStorage.getItem("jwtToken")
            }
        });
        console.log('TCL: NewReport -> componentDidMount -> isOuth', isOuth)
        if (isOuth.data.err === "401") {
            this.setState({content: <h3 className="field title is-3">You need to login first</h3>})
        } else if (isOuth.data) {
            console.log("isOuth", isOuth);
            this.setState({
                writer: isOuth.data.email,
                content:
                    <form  className="column is-half" method="post">
                        <div className="field">
                            <label className="label">Kmom number: </label>
                            <div className="control">
                                <input onChange={this.onChange}
                                className="input"
                                name="kmomNum"
                                type="text" placeholder="Kmom #" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Report</label>
                            <div className="control">
                                <textarea onChange={this.onChange}
                                name="report"
                                className="textarea"
                                placeholder="Report text"></textarea>
                            </div>
                        </div>
                        <div className="control column is-centered">
                            <button
                                onClick={this.onSubmit.bind(this)}
                                className="button is-centered is-link"
                            >
                                Submit report
                            </button>
                        </div>
                    </form>})
        }
    }
    

    async onSubmit(e) {
        e.preventDefault();
        const { kmomNum, report, writer } = this.state;
        const data = {
            kmomNum,
            report,
            writer
        };
        console.log('TCL: NewReport -> onSubmit -> data', data)
		// console.log('TCL: NewReport -> onSubmit -> kmomNum, report', kmomNum, report)
        // console.log(localStorage.getItem('jwtToken'));
        try {
            const reportInfo = await axios.post(`${process.env.REACT_APP_API_URL}/reports`,
                data,
                {
                    headers: {
                        'x-access-token': localStorage.getItem("jwtToken")
                    }
                }
            );
            console.log('TCL: NewReport -> onSubmit -> reportInfo', reportInfo);
            this.setState({redirect: true})
        } catch (error) {
		    console.log('TCL: NewReport -> }catch -> error', error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="container section">
                <div className="columns is-centered">
                    {this.state.content}
                </div>
            </div>
        );
    }
}

export default NewReport;