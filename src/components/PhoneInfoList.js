//여러개의 PhoneInfo 컴포넌트 보여줌
import React, { Component} from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate:  () => console.warn('onRemove not defined'),
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data != this.props.data;
    }

    render() {
        console.log('render PhoneInfoList');
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            //key는 배열 렌더링 시 업데이트 성능 최적화 위해 필요함
            info => (
            <PhoneInfo 
                key={info.id}
                info={info}
                onRemove={onRemove}
                onUpdate={onUpdate}
                />)
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;