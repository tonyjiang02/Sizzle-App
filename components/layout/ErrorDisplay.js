import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
const ErrorDisplay = ({ errors }) => {
    let ref = useRef();
    const errorTitles = {
        'success': 'Success',
        'warn': 'Warning'
    };
    useEffect(() => {
        console.log("Running error display");
        const err = errors.error;
        if (err) {
            console.log("error exists");
            const msg = err.msg;
            const type = err.type;
            // ref.current.alertWithType('success', "Success", 'some message');
            // // ref.current.alertWithType("success", "Success", "some message");
            ref.current.alertWithType(type, errorTitles[type], msg);
        }
    }, [errors]);
    return (
        <DropdownAlert ref={ref}></DropdownAlert>
    );
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {})(ErrorDisplay);
