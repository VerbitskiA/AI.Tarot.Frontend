'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchService from "@/configs/http-service/fetch-settings";
import {ConfigurationType} from "@/lib/types/config.types";


interface ConfigurationContextType {
    configuration: ConfigurationType | null;
    fetchConfiguration: () => Promise<void>;
}

const ConfigurationContext = createContext<ConfigurationContextType | undefined>(undefined);

export const useConfiguration = () => {
    const context = useContext(ConfigurationContext);
    if (context === undefined) {
        throw new Error('useConfiguration must be used within a ConfigurationProvider');
    }
    return context;
};

export const ConfigurationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [configuration, setConfiguration] = useState<ConfigurationType | null>(null);

    const fetchConfiguration = async () => {
        const res = await fetchService.get('api/configuration/', {
            credentials: 'include',
            source: 'client',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
        });
        console.log('PROVIDER')
        console.log(res)
        setConfiguration(res.data);
    };

    useEffect(() => {
        fetchConfiguration(); // Получаем конфигурацию при первом рендере
    }, []);

    return (
        <ConfigurationContext.Provider value={{ configuration, fetchConfiguration }}>
            {children}
        </ConfigurationContext.Provider>
    );
};
