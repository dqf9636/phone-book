import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: '임솔',
        phone: '01050216558'
      },
      {
        id: 1,
        name: '임보람',
        phone: '01033457558'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
      this.setState({
        keyword: e.target.value,
      });
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      //concat: 배열 합치기
      information: information.concat({ id: this.id++, ...data})
    })
  }

  //PhoneInfoList의 onRemove로 전달
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  //데이터 수정한 새로운 배열 생성(기존 값 건드리지 않고)
  //PhoneInfoList의 onUpdate로 전달
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id ===info.id
        ? { ...info, ...data}//새 객체 만들어 수정값 덮어쓰기
        : info//기존값 유지
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm 
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder = "검색할 이름을 입력하세요"
            onChange = {this.handleChange}
            value = {keyword}
          />
        </p>
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
