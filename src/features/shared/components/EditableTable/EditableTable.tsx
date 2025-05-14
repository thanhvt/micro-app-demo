import React, { useState, useEffect, useRef } from 'react';
import { Table, Form, Input, InputNumber, Select, DatePicker, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'text' | 'number' | 'select' | 'date';
  record: any;
  index: number;
  children: React.ReactNode;
  options?: { value: string | number; label: string }[];
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  
  .anticon {
    cursor: pointer;
    padding: 4px;
    &:hover {
      color: #1890ff;
    }
  }
`;

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  options,
  ...restProps
}) => {
  const inputNode = (() => {
    switch (inputType) {
      case 'number':
        return <InputNumber style={{ width: '100%' }} />;
      case 'select':
        return (
          <Select style={{ width: '100%' }} options={options} />
        );
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      default:
        return <Input />;
    }
  })();

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface EditableTableProps {
  columns: any[];
  dataSource: any[];
  rowKey: string;
  onChange: (data: any[]) => void;
}

const EditableTable: React.FC<EditableTableProps> = ({
  columns,
  dataSource,
  rowKey,
  onChange
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const isEditing = (record: any) => record[rowKey] === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record[rowKey]);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => item[rowKey] === key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        onChange(newData);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key: string) => {
    const newData = data.filter(item => item[rowKey] !== key);
    setData(newData);
    onChange(newData);
  };

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        options: col.options,
      }),
    };
  });

  const actionColumn = {
    title: 'Actions',
    dataIndex: 'actions',
    render: (_: any, record: any) => {
      const editable = isEditing(record);
      return editable ? (
        <ButtonGroup>
          <SaveOutlined onClick={() => save(record[rowKey])} />
          <CloseOutlined onClick={cancel} />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <EditOutlined onClick={() => edit(record)} />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => handleDelete(record[rowKey])}
          >
            <DeleteOutlined />
          </Popconfirm>
        </ButtonGroup>
      );
    },
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={[...mergedColumns, actionColumn]}
        rowKey={rowKey}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default EditableTable;
