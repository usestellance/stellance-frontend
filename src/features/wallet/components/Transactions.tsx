"use client";
import React from "react";
import TransactionCards from "./TransactionCards";
import { useGetTransactions } from "../hooks";
import { ITransaction } from "../../../types/transactionTypes";
import TransactionPagination from "./TransactionPagination";

const Transactions = () => {
	const { data, isLoading, isError, error } = useGetTransactions();

	const transactions = data?.data || [];
	const totalPages = data?.totalPages || 1;

	console.log(transactions);

	// Loading state
	if (isLoading) {
		return (
			<div>
				<h5 className="text-sm font-medium lg:text-2xl">Recent Transactions</h5>

				<div className="mt-10 text-center text-gray-500 animate-pulse">
					Loading transactions...
				</div>
			</div>
		);
	}

	// Error state
	if (isError) {
		return (
			<div>
				<h5 className="text-sm font-medium lg:text-2xl">Transactions</h5>

				<div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
					<p className="font-medium text-red-600">
						Failed to load transactions.
					</p>

					<p className="mt-2 text-sm text-red-500">
						{error instanceof Error
							? error.message
							: "Something went wrong. Please try again."}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w[1200px] mx-auto">
			<h2 className="h2-app">Transactions</h2>

			<section>
				{transactions.length === 0 ? (
					<div className="mt-20 text-center lg:text-xl">
						No Recent Transactions
					</div>
				) : (
					<>
						<div className="mt-2.5 space-y-[15px] lg:mt-7">
							{transactions.map((transaction: ITransaction) => (
								<TransactionCards key={transaction.id} {...transaction} />
							))}
						</div>

						{totalPages > 1 && (
							<div className="mt-10 lg:mt-[60px]">
								<TransactionPagination pageNumber={totalPages} />
							</div>
						)}
					</>
				)}
			</section>
		</div>
	);
};

export default Transactions;
