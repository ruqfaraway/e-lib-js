import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * Main DatePicker
 * @param   {string} valueFormat date format used to adjust the given value
 * @param   {string} parseFormat date format used to adjust the return value
 */
const MainDatePicker = ({ style, onChange, valueFormat, parseFormat, value, ...props }) => {
	const dateValue = !!value ? dayjs(value, valueFormat) : undefined
	return (
		<DatePicker
			{...props}
			value={dateValue}
			onChange={(date, dateString) => {
				onChange(date !== null ? (!!parseFormat ? date.format(parseFormat) : date.toISOString()) : null, dateString)
			}}
			style={{ width: '100%', ...style }}
		/>
	)
}
MainDatePicker.propTypes = {
	parseFormat: PropTypes.string,
	valueFormat: PropTypes.string
}
export default MainDatePicker
