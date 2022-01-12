import React from 'react';
import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number1:null,
            number2:null,
            result:null,
            operator:null,
            bodystyle:{
                backgroundColor: "hsl(222, 26%, 31%)",
                overflowX: "hidden"
            },
            calcbtn:{
                backgroundColor: "hsl(30, 25%, 89%)",
                boxShadow: "0px 4px hsl(28, 16%, 65%)",
                color: "hsl(221, 14%, 31%)"
            },
            screenBg:{backgroundColor: "hsl(224, 36%, 15%)"},
            equals:{backgroundColor:"hsl(225, 21%, 49%)",boxShadow:"0px 4px solid hsl(224, 28%, 35%)",color:"white"},
            equals1:{backgroundColor:"hsl(6, 63%, 50%)",boxShadow:"hsl(6, 70%, 34%)",color:"white"},
            header:{color:"white"},
            dot:{transform: "translateX(0%)",backgroundColor:"hsl(6, 63%, 50%)"}
        }
    }

    componentDidMount() {
        var keyboard = document.body;
        keyboard.addEventListener('keydown',(e) => {
            console.log(e.code)
            if(e.code == 'NumpadEnter'|| e.code == 'Enter') this.evaluate();
            else if(e.code == 'Backspace') this.delete();
            this.changeExpression(e.key);
        })
    }

    changeExpression = (n)=>{
        var num1 = this.state.number1, optr = this.state.operator, num2 = this.state.number2;
        if(num1 == null){
            if(n == '+' || n == '-' || n == '.') this.setState({number1 : n});
            else if(!isNaN(Number(n))) this.setState({number1 : n});
        } else if(optr == null){
            if(n == '+' || n=='-' || n=='*' || n=='/') this.setState({operator : n});
            else if(!isNaN(Number(num1 + n))) this.setState({number1 : num1+n});
        } else if(num2 == null){
            if(n == '+' || n=='-' || n=='.') this.setState({number2 : n});
            else if(!isNaN(Number(n))) this.setState({number2 : n});
        } else if(!isNaN(Number(num2 + n))) this.setState({number2 : num2 + n});
    }

    evaluate = ()=>{
        var {number1,operator,number2} = this.state;
        if(number1 == null || number2 == null || operator == null) return;
        if(operator == '+') number1 = Number(number1) + Number(number2);
        else if(operator == '-') number1 = Number(number1) - Number(number2);
        else if(operator == '*') number1 = Number(number1) * Number(number2);
        else if(operator == '/') number1 = Number(number1) / Number(number2);
        number2 = null;
        operator = null;
        this.setState({number1,number2,operator});
    }

    delete = (e)=>{
        var {number1,operator,number2} = this.state;
        if(number2 != null) {
            if(number2 == 0) this.setState({number2:null});
            else this.setState({number2:`${(number2-number2%10)/10}`})
        }
        else if(operator != null) this.setState({operator:null});
        else if(number1 != null) this.setState({number1:`${(number1-number1%10)/10}`})
    }

    reset = (e)=>{this.setState({number1:null,operator:null,number2:null});}

    changeTheme = (e)=>{
        var id = e.target.innerText;
        console.log(e.target.innerText);
        if(id == '1'){
            this.setState({
                bodystyle:{
                    backgroundColor: "hsl(222, 26%, 31%)",
                    overflowX: "hidden"
                },
                calcbtn:{
                    backgroundColor: "hsl(30, 25%, 89%)",
                    boxShadow: "0px 4px hsl(28, 16%, 65%)",
                    color: "hsl(221, 14%, 31%)"
                },
                screenBg:{backgroundColor: "hsl(224, 36%, 15%)"},
                equals:{backgroundColor:"hsl(225, 21%, 49%)",boxShadow:"0px 4px solid hsl(224, 28%, 35%)",color:"white"},
                equals1:{backgroundColor:"hsl(6, 63%, 50%)",boxShadow:"hsl(6, 70%, 34%)",color:"white"},
                header:{color:"white"},
                dot:{transform: "translateX(0%)",backgroundColor:"hsl(6, 63%, 50%)"}
            })
        } else if(id == '2'){
            this.setState({
                bodystyle:{
                    backgroundColor: "hsl(0, 0%, 90%)",
                    overflowX: "hidden",
                    color: "hsl(35, 11%, 61%)"
                },
                calcbtn:{
                    backgroundColor: "hsl(45, 7%, 89%)",
                    boxShadow: "0px 4px hsl(35, 11%, 61%)",
                    color: "hsl(60, 10%, 19%)"
                },
                screenBg:{backgroundColor: "hsl(0, 5%, 81%)",color:"hsl(60, 10%, 19%)"},
                equals:{backgroundColor:"hsl(185, 42%, 37%)",boxShadow:"hsl(185, 58%, 25%)",color:"white"},
                equals1:{backgroundColor:"hsl(6, 63%, 50%)",boxShadow:"hsl(6, 70%, 34%)",color:"white"},
                header:{color:"black"},
                dot:{transform: "translateX(100%)",backgroundColor:"hsl(25, 98%, 40%)"}
            })
        } else if(id == '3'){
            this.setState({
                bodystyle:{
                    backgroundColor: "hsl(268, 75%, 9%)",
                    overflowX: "hidden"
                },
                calcbtn:{
                    backgroundColor: "hsl(268, 47%, 21%)",
                    boxShadow: "0px 4px hsl(290, 70%, 36%)",
                    color: "hsl(52, 100%, 62%)"
                },
                screenBg:{backgroundColor: "hsl(268, 71%, 12%)",color:"hsl(52, 100%, 62%)"},
                equals:{backgroundColor:"hsl(281, 89%, 26%)",boxShadow:"hsl(285, 91%, 52%)",color:"white"},
                equals1:{backgroundColor:"hsl(176, 100%, 44%)",boxShadow:"hsl(177, 92%, 70%)",color:"black"},
                header:{color:"hsl(52, 100%, 62%)"},
                dot:{transform: "translateX(200%)",backgroundColor:"hsl(176, 100%, 44%)"}
            })
        }
        
    }

    render() {
        return (<>
        <div class="container" style={this.state.bodystyle}>
            <div class="header" style={this.state.header}>
            <h1>calc</h1>
            <div class="themechangecontainer">
                <div class="left">theme</div>
                <div class="right">
                <div class="dot" style={this.state.dot}></div>
                <div class="themebtncontainer" onClick={this.changeTheme}>
                    <div class="btnlabel">1</div>
                </div>
                <div class="themebtncontainer" onClick={this.changeTheme}>
                    <div class="btnlabel">2</div>
                </div>
                <div class="themebtncontainer" onClick={this.changeTheme}>
                    <div class="btnlabel">3</div>
                </div>
                </div>
            </div>
            </div>
            <div class="screen" style={this.state.screenBg}><div>{this.state.number1 == null?0:null}<span>{this.state.number1}</span> <span>{this.state.operator}</span> <span>{this.state.number2}</span></div></div>
            <div class="btns" style={this.state.screenBg}>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('7')}} style={this.state.calcbtn}>7</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('8')}} style={this.state.calcbtn}>8</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('9')}} style={this.state.calcbtn}>9</button>
                <button class="calcbtn light" onClick={this.delete} style={this.state.equals}>del</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('4')}} style={this.state.calcbtn}>4</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('5')}} style={this.state.calcbtn}>5</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('6')}} style={this.state.calcbtn}>6</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('+')}} style={this.state.calcbtn}>+</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('1')}} style={this.state.calcbtn}>1</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('2')}} style={this.state.calcbtn}>2</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('3')}} style={this.state.calcbtn}>3</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('-')}} style={this.state.calcbtn}>-</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('.')}} style={this.state.calcbtn}>.</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('0')}} style={this.state.calcbtn}>0</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('/')}} style={this.state.calcbtn}>/</button>
                <button class="calcbtn" onClick = {()=>{this.changeExpression('*')}} style={this.state.calcbtn}>&times;</button>
                <button class="calcbtn light reset" onClick = {this.reset} style={this.state.equals}>reset</button>
                <button class="calcbtn equals" onClick = {this.evaluate} style={this.state.equals1}>=</button>
            </div>
        </div>
        
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="#">naga</a>.
        </div>
        </>)
    }
};

export default App;