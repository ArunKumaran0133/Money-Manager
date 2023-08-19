import './index.css'

const TransactionItem = props => {
  const {eachTransaction, deleteTransaction} = props
  const {id, title, amount, type} = eachTransaction

  const deleteHistory = () => {
    deleteTransaction(id)
  }

  return (
    <li className="item-history-container">
      <p className="text-style">{title}</p>
      <p className="text-style">{amount}</p>
      <p className="text-style">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={deleteHistory}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
