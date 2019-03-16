import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name: '',
        phone: ''
    }

    //onChange 이벤트 발생하면 e.target.value 값을 통해 현재 텍스트 값을 읽어옴
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }

    handleSubmit = (e) => {
        //페이지 리로딩 방지
        e.preventDefault();
        //상태값을 onCreate 통해 부모 컴포넌트에 전달
        this.props.onCreate(this.state);
        //상태 초기화
        this.setState({
            name: '',
            phone: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder = "이름"
                    value={this.state.name}
                    //onChange: input의 텍스트 값이 바뀔 때마다 발생하는 이벤트
                    onChange={this.handleChange}
                    name="name"
                />
                <input
                    placeholder = "전화번호"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    name="phone"
                />
                <button type="submit">등록</button>
            </form>
            //submit이 발생하면 props로 받은 함수를 호출하여 부모에서 파라미터로 받은 값 사용할 수 있음
        );
    }s
}

export default PhoneForm;