import React, { useEffect, useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { NEXT, NUMBER, PAGE, PREVIOUS, VALUE } from "../Utils/constants";
import { get } from "lodash";

function Pagination({
	pageDetails,
	onPrevClick,
	onPageBlur,
	onHandleEnter,
	onNextClick,
}) {
	const { currentPage, totalPage } = pageDetails;
	const [page, setPage] = useState(currentPage);

	useEffect(() => {
		setPage(currentPage);
	}, [currentPage]);

	const handlePageChange = (event) => {
		const page = Number(get(event, VALUE));
		setPage(page);
	};

	return (
		<div>
			<Button
				disabled={currentPage === 1}
				onClick={onPrevClick}>
				{PREVIOUS}
			</Button>
			<InputLabel>{PAGE}</InputLabel>
			<Input
				type={NUMBER}
				onBlur={onPageBlur}
				onKeyDown={onHandleEnter}
				onChange={handlePageChange}
				value={page}
			/>
			<InputLabel>{totalPage}</InputLabel>
			<Button
				disabled={currentPage === totalPage}
				onClick={onNextClick}>
				{NEXT}
			</Button>
		</div>
	);
}

export default Pagination;
