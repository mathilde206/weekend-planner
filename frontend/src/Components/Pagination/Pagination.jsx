import React from 'react';
import PropTypes from 'prop-types';

import { range } from 'lodash';

const Pagination = ({activePage, handlePageChange, totalPages}) => {

    let pagesArray = range(1, totalPages+1);

    const onPreviousClick = (event) => {
        event.preventDefault();

        if (activePage > 1) {
            console.log(activePage-1)
            handlePageChange(activePage - 1)
        }
    };

    const onNextClick = (event) => {
        event.preventDefault();

        if (activePage < totalPages) {
            handlePageChange(activePage + 1)
        }
    };


    return (
        <ul className="pagination">
            <li className={activePage > 1 ? "waves-effect" : "disabled"}>
                <a onClick={onPreviousClick}>
                    <i className="material-icons">chevron_left</i>
                </a>
            </li>

            {
                pagesArray.map(pageNumber => (
                    <li key={pageNumber} className={pageNumber === activePage ? "active" : 'waves-effect'}>
                        <a
                        onClick={(event) => handlePageChange(pageNumber)}>{pageNumber}
                        </a>
                    </li>
                ))
            }

            <li className={activePage < totalPages ? "waves-effect" : "disabled"}>
                <a onClick={onNextClick}>
                    <i className="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>)
};

Pagination.propTypes = {
    activePage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    next: PropTypes.string,
    previous: PropTypes.string,
    totalPages: PropTypes.number.isRequired,
};

export default Pagination
