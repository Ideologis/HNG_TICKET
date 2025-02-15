"use client";
import React, { createContext, useContext, useState } from "react";

interface StateContextType {
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	error: string | null;
	setError: (error: string | null) => void;
	showSuccess: (message: string) => void;
	successMessage: string | null;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const showSuccess = (message: string) => {
		setSuccessMessage(message);
		setTimeout(() => setSuccessMessage(null), 3000);
	};

	return (
		<StateContext.Provider
			value={{
				isLoading,
				setIsLoading,
				error,
				setError,
				showSuccess,
				successMessage,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => {
	const context = useContext(StateContext);
	if (context === undefined) {
		throw new Error("useStateContext must be used within a StateProvider");
	}
	return context;
};
