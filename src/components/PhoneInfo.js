//각 전화번호의 정보

import React, { Component} from 'react';

class PhoneInfo extends Component {
    //info가 undefined일 때 컴포넌트 크래쉬되는 것 방지->기본값 설정
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        },
    }
    
    //수정 버튼 눌렀을 때 editing을 true로 설정
    //true일 때 input형태로 변경
    state = {
        editing: false,

        //수정값 담기 위한 필드
        name: '',
        phone: '',
    }

    //삭제 버튼 클릭되면 onRemove에 id 넣어서 호출
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    //editing 값 반전시키는 함수(false->true / true->false)
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    //input에서 onChange 이벤트 발생할 때 호출되는 함수
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    //editing 값이 바뀔 때 처리해야 할 로직
    componentDidUpdate(prevProps, prevState) {
        const { info, onUpdate } = this.props;
        //false->true
        //info의 값을 state에 넣어주기
        if(!prevState.editing && this.state.editing) {
            this.setState({
                name: info.name,
                phone: info.phone
            })
        }

        //true->false
        //수정된 값 적용하기
        if(prevState.editing && !this.state.editing) {
            onUpdate(info.id, {
                name: this.state.name,
                phone: this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //수정 상태가 아니고, info 값이 같다면 리렌더링 하지 않음
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info) {
            return false;
        }
        return true;
    }

    render() {
        console.log('render PhoneInfo' + this.props.info.id);
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };

        const { editing } = this.state;

        //수정모드
        if(editing) {
            return(
                <div style={style}>
                    <div>
                        <input
                            value={this.state.name}
                            name="name"
                            placeholder="이름"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input
                            value={this.state.phone}
                            name="phone"
                            placeholder="전화번호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }

        //일반모드
        const { name, phone, id } = this.props.info;

        return (
            <div style={style}>
                <div><b>{name}</b></div>
                <div>{phone}</div>
                <button onClick={this.handleToggleEdit}>수정</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>
        );
    }
}

export default PhoneInfo;