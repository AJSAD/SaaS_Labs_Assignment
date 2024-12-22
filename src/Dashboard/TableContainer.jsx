import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { get } from "lodash";
import Pagination from "./Pagination";
import * as CONSTANTS from "../Utils/constants";
import "./tableContainer.css";

function TableContainer() {
    const [data, setData] = useState([]);
    const [pageDetails, setPageDetails] = useState({currentPage: 1, totalPage: 1});
    const [isBlurPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(CONSTANTS.FETCH_URL);
                const result = await response.json();
                setData(result);
                setPageDetails(prev => ({
                    ...prev,
                    totalPage: Math.ceil(result.length / 5),
                }));
                
            } catch (error) {
                console.error(CONSTANTS.ERROR_MSG, error);
            }
        };

        fetchData();
    }, []);

    const handlePrevClick = () => {
        setPageDetails(prev => ({
            ...prev,
            currentPage: get(prev, CONSTANTS.CURRENT_PAGE) - 1,
        }));
    }

    const handleNextClick = () => {
        setPageDetails(prev => ({
            ...prev,
            currentPage: get(prev, CONSTANTS.CURRENT_PAGE) + 1,
        }));
    }

    const handlePageBlur = (event) => {
        startTransition(() => {
            let newPage = get(event, CONSTANTS.VALUE);
            newPage = Math.max(1, Math.min(get(pageDetails, CONSTANTS.TOTAL_PAGE), newPage));
            setPageDetails((prev) => ({ 
                ...prev, 
                currentPage: newPage,
                tempPage: newPage 
            }));
        })
    }

    const handleEnterKey = (event) => {
        if (get(event, CONSTANTS.KEY) === CONSTANTS.ENTER) {
            handlePageBlur(event)
        }
    }

    const itemsPerPage = 5;
    const startIndex = (get(pageDetails, CONSTANTS.CURRENT_PAGE) - 1) * itemsPerPage;
    const currentPageItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="tableContainer">
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>{CONSTANTS.SNO_LABEL}</TableCell>
                    <TableCell>{CONSTANTS.PERCENTAGE_FUNDED_LABEL}</TableCell>
                    <TableCell>{CONSTANTS.AMOUNT_PLEDGED_LABEL}</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 && currentPageItems.map((item)=> (
                        <TableRow key={get(item, CONSTANTS.BY_KEY)}>
                            <TableCell>{get(item, CONSTANTS.SNO_KEY, CONSTANTS.HIFEN)}</TableCell>
                            <TableCell>{get(item, CONSTANTS.PERCENTAGE_FUNDED_KEY, CONSTANTS.HIFEN)}</TableCell>
                            <TableCell>{get(item, CONSTANTS.AMOUNT_PLEDGED_KEY, CONSTANTS.HIFEN)}</TableCell>
                        </TableRow> 
                    ))}
                </TableBody>
            </Table>
            <Pagination
                pageDetails={pageDetails}
                isBlurPending={isBlurPending}
                onPrevClick={handlePrevClick}
                onPageBlur={handlePageBlur}
                onHandleEnter={handleEnterKey}
                onNextClick={handleNextClick}
            />
        </div>
    );
}

export default TableContainer;