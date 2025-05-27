import { useState } from "react";
import { FaSearch } from "react-icons/fa";


export default function TaskMenu({ onFilter, onSort, onSearch }) {
    const filterOptions = [
        {
            text: 'Всі',
            rule: () => { return true },
        },
        {
            text: 'Активні',
            rule: (t) => { return !t.done }
        },
        {
            text: 'Просрочені',
            rule: (t) => {
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                return !t.done && new Date(t.deadline) < today
            }
        }
    ];

    const sortOptions = [
        {
            text: 'Створення',
            rule: (a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt)
            }
        },
        {
            text: 'Дедлайн',
            rule: (a, b) => {
                return new Date(a.deadline) - new Date(b.deadline)
            }
        },
        {
            text: 'Пріоритет',
            rule: (a, b) => {
                return a.priority - b.priority
            }
        }
    ]

    const [selectedFilter, setSelectedFilter] = useState(0);
    const [selectedSort, setSelectedSort] = useState(0);
    const [searchText, setSearchText] = useState('');

    function handleSort(index) {
        setSelectedSort(index);
        onSort(() => sortOptions[index].rule);
    }

    function handleFilter(index) {
        setSelectedFilter(index);
        onFilter(() => filterOptions[index].rule);
    }

    function handleSearchChange(e) {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value);
    }

    return (
        <div className="task-menu">
            <div className="menu-search">
                <FaSearch className="search-icon"/>
                <input
                    type="text"
                    placeholder="Пошук задач..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="control-menu">
                <div className="control-group">
                    <span className="menu-label">Фільтр</span>
                    <div className="menu-btn-wrapper">
                        {filterOptions.map((option, index) => (
                            <button
                                key={option.text}
                                className={`menu-btn ${index === selectedFilter ? 'selected' : ''}`}
                                onClick={() => handleFilter(index)}>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="control-group">
                    <span className="menu-label">Сортування</span>
                    <div className="menu-btn-wrapper">
                        {sortOptions.map((option, index) => (
                            <button
                                key={option.text}
                                className={`menu-btn ${index === selectedSort ? 'selected' : ''}`}
                                onClick={() => handleSort(index)}>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}