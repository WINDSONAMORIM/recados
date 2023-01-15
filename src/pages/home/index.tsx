import React from 'react';
import { HeaderHome } from '../../components/headerHome';
import CustomizedTables from '../../components/tableHome';
import { HomeContent } from '../../components/wrapperContent';
import { MainHome } from '../../components/mainHome';

export const Home = ()=>{
    return (
        <HomeContent>
            <HeaderHome />
            <MainHome />
            <CustomizedTables />
        </HomeContent>
    )
}