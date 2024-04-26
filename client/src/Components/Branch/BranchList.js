import React from 'react'
import CommonTable from '../../CommonTable'
import "./branch.scss"

function BranchList({branchData}) {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width:"200px",
          className:"ant-table-column-name"
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
          width:"200px"

        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          width:"200px"

        },
        {
          title: 'Contact',
          dataIndex: 'contact',
          key: 'contact',
          width:"200px"
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width:"300px"
        },
        {
          title: "Today's Income",
          dataIndex: 'todaysIncome',
          key: 'todaysIncome',
          width:"200px"
        },
        {
          title: 'Last Week',
          dataIndex: 'lastWeek',
          key: 'lastWeek',
          width:"200px"
        },
        {
          title: 'Last Month',
          dataIndex: 'lastMonth',
          key: 'lastMonth',
          width:"200px"
        },
        {
          title: 'Working Employees',
          dataIndex: 'workingEmploy',
          key: 'workingEmploy',
          width:"400px",
          render: (workingEmploy) => (
            <span>
              {workingEmploy.map((role, index) => (
                <span key={index}>
                  {Object.keys(role).map((key, i) => (
                    <span key={i}>
                      {key}: {role[key]}
                      {i !== Object.keys(role).length - 1 && ', '}
                    </span>
                  ))}
                  {index !== workingEmploy.length - 1 && <br />}
                </span>
              ))}
            </span>
          ),
        },
      ];

  return (
    <CommonTable dataSource={branchData} columns={columns} classname={"columnHeader"}/> 
  )
}

export default BranchList
