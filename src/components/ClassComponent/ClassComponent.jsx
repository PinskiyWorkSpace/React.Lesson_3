import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
    count: 0,
    userWinner: false,
  };


  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
      userWinner: false,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber}, попыток ${state.count}`,
        userWinner: true,
        count: 0,
        randomNumber: Math.floor(Math.random() * this.props.max - this.props.min) + this.props.min,
      };
    });
    this.clearField();
  };

  clearField = () => {
    this.setState({
      userNumber: '',
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form}
          onSubmit={this.handleSubmit}>

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input}
            type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber} />

          <button className={style.btn}
            type='submit' >{this.state.userWinner ? 'Играть еще?' : 'Угадать'}</button>

        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};


