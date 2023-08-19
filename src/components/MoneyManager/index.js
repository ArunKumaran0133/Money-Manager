import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    addHistoryList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {addHistoryList} = this.state

    const updateHistoryList = addHistoryList.filter(
      eachList => eachList.id !== id,
    )

    this.setState({addHistoryList: updateHistoryList})
  }

  onSubmitBtn = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      addHistoryList: [...prevState.addHistoryList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getAmount = event => {
    this.setState({amount: event.target.value})
  }

  getExpenses = () => {
    const {addHistoryList} = this.state

    let expensesAmount = 0

    addHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {addHistoryList} = this.state

    let incomeAmount = 0
    addHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {addHistoryList} = this.state

    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    addHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {title, amount, addHistoryList, optionId} = this.state

    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="main-bg-container">
        <div className="user-name-container">
          <h1 className="name">HI, Arun</h1>
          <p className="welcome-text">
            Welcome back to your <span className="span-el">Money Manager</span>
          </p>
        </div>
        <div className="main-money-details-container">
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </div>
        <div className="history-form-container">
          <form className="form-container" onSubmit={this.onSubmitBtn}>
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <div className="input-container">
              <label htmlFor="title" className="label-text">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="income-input"
                placeholder="TITLE"
                onChange={this.getTitle}
                value={title}
              />
            </div>
            <div className="input-container">
              <label htmlFor="amount" className="label-text">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                className="income-input"
                placeholder="AMOUNT"
                onChange={this.getAmount}
                value={amount}
              />
            </div>
            <div className="input-container">
              <label htmlFor="type" className="label-text">
                Type
              </label>
              <select
                id="type"
                className="income-input"
                onChange={this.getOptionId}
                value={optionId}
              >
                {transactionTypeOptions.map(eachType => (
                  <option key={eachType.optionId} value={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add-button" type="submit">
              ADD
            </button>
          </form>
          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <ul className="list-container">
              <li className="item-container">
                <p className="title">Title</p>
                <p className="title">Amount</p>
                <p className="title">Type</p>
              </li>
              {addHistoryList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  eachTransaction={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
