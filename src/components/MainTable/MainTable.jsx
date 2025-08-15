import { Table } from 'antd'
import { isEqual, omit } from 'lodash'
import { useRouter } from 'next/router'
import { memo } from 'react'
/**
 * MainTable
 * @param {string} rowKey
 * @param {object[]} dataSource
 * @param {object[]} columns
 * @param {{current, per_page, total }} query
 */
const addSortersToColumns = (columns) => {
	return columns.map((column) => {
		if (column.key === 'action') {
			return column
		}

		return {
			...column,
			sorter: (a, b) => {
				if (typeof a[column.dataIndex] === 'string') {
					return a[column.dataIndex].localeCompare(b[column.dataIndex])
				} else {
					return a[column.dataIndex] - b[column.dataIndex]
				}
			}
		}
	})
}
const MainTable = memo(
	({ rowKey = 'id', dataSource, columns, query, showPagination = true, showSizeChanger = false, ...other }) => {
		const router = useRouter()
		const columnsWithSorters = addSortersToColumns(columns)
		return (
			<Table
				rowKey={rowKey}
				dataSource={dataSource}
				columns={columns}
				rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-white' : 'table-row-black')}
				scroll={{ x: 'max-content' }}
				pagination={
					showPagination
						? {
								showSizeChanger: showSizeChanger,
								current: query?.page ?? 1,
								total: query?.total ?? 0,
								pageSize: query?.per_page ?? 10,
								onChange: (page, pageSize) => {
									const other = omit(query, 'total')
									router.push({
										query: {
											...other,
											page: page,
											per_page: pageSize
										}
									})
								}
								// itemRender: () => {

								// }
						  }
						: false
				}
				{...other}
			/>
		)
	},
	(prevProps, nextProps) =>
		!['dataSource', 'columns', 'query'].map((item) => isEqual(prevProps[item], nextProps[item])).includes(false)
)
export default MainTable
