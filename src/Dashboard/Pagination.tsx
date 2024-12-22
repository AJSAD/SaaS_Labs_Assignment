import React, { useEffect, useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { NEXT, NUMBER, OF, PAGE, PREVIOUS, VALUE } from "../Utils/constants";
import { get } from "lodash";
import "./pagination.css";

function Pagination({
	pageDetails,
	isBlurPending,
	onPrevClick,
	onPageBlur,
	onHandleEnter,
	onNextClick,
}) {
	const { currentPage, totalPage } = pageDetails;
	const [page, setPage] = useState(currentPage);

	useEffect(() => {
		setPage(currentPage);
	}, [currentPage, isBlurPending]);

	const handlePageChange = (event) => {
		const page = get(event, VALUE);
		setPage(page);
	};

	return (
		<div className="pagination">
			<Button
				variant="contained"
				color="secondary"
				disabled={currentPage === 1}
				onClick={onPrevClick}>
				{PREVIOUS}
			</Button>
			<div className="pageContainer">
				<InputLabel color="secondary">{PAGE}</InputLabel>
				<Input
					color="secondary"
					type={NUMBER}
					onBlur={onPageBlur}
					onKeyDown={onHandleEnter}
					onChange={handlePageChange}
					value={page}
					minRows={1}
					maxRows={21}
				/>
				<InputLabel color="secondary">
					{OF + " " + totalPage}
				</InputLabel>
			</div>
			<Button
				variant="contained"
				color="secondary"
				disabled={currentPage === totalPage}
				onClick={onNextClick}>
				{NEXT}
			</Button>
		</div>
	);
}

export default Pagination;
