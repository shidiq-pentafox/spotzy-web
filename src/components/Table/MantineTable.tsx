import {
  Box,
  Button,
  Group,
  Image,
  MantineProvider,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import classes from "./CSS.module.css";
import "mantine-react-table/styles.css";
import React from "react";
import { IconDownload } from "@tabler/icons-react";
import { download, generateCsv, mkConfig } from "export-to-csv";
// import DateFilterComponent from "../../DateFilterComponent";

const MantineTable = ({
  rowData,
  columnData,
  dataLoading,
  title,
  extraElement,
  selectedPeriod,
  setSelectedPeriod,
  TableProps,
}) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: title,
  });

  const transformDataForCsv = (data, columns) => {
    return data.map((row) => {
      const transformedRow = {};
      columns.forEach((column) => {
        const headerKey = column.header || column.id; // Use header if available
        if (column.accessorKey) {
          transformedRow[headerKey] = row[column.accessorKey];
        } else if (column.accessorFn) {
          transformedRow[headerKey] = column.accessorFn(row);
        } else {
          transformedRow[headerKey] = row[column.id];
        }
      });
      return transformedRow;
    });
  };

  const handleExportData = () => {
    const transformedData = transformDataForCsv(rowData, columnData);

    // Use headers from column definitions for CSV
    const csvHeaders = columnData.map((column) => column.header || column.id);

    // Add headers to CSV config
    const csvConfigWithHeaders = {
      ...csvConfig,
      headers: csvHeaders,
    };

    const csv = generateCsv(csvConfigWithHeaders)(transformedData);
    download(csvConfigWithHeaders)(csv);
  };

  const table = useMantineReactTable({
    data: rowData || [],
    columns: columnData,
    state: {
      isLoading: dataLoading,
    },
    enableColumnActions: true,
    mantinePaperProps: { className: classes.paper },
    mantineTopToolbarProps: { className: classes.toolbars },
    mantineBottomToolbarProps: { className: classes.toolbars },
    renderTopToolbarCustomActions: ({ tables }) => (
      <Box
        style={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={handleExportData}
          leftSection={<IconDownload size={14} />}
          variant="light"
          radius={"md"}
          color="rgb(76, 108, 90)"
        >
          Export
        </Button>
        {extraElement}
      </Box>
    ),
    ...TableProps,
  });

  const parentTheme = useMantineTheme();
  const { rows } = table.getRowModel();

  return (
    <Box>
      {
        title && (
          <Group justify="space-between" p={10}>
            <Title>{title}</Title>
            {/* <DateFilterComponent setSelectedPeriod={setSelectedPeriod} /> */}
          </Group>
        )
      }

      <Box
        style={{
          overflowX: "auto",
          border: "1px solid #DFE8FF",
          borderRadius: 5,
          marginTop: 14,
        }}
      >
        {/* {!dataLoading && rows.length === 0 ? (
          <Box
            style={{
              height: 660,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src="https://i.imgur.com/2LuYagE.png" w={120} />
              <Text color="dimmed" w={400} mt={16}>
                There are currently no records to display. Please check back
                later or adjust your filters.
              </Text>
            </Box>
          </Box>
        ) : ( */}
        <MantineProvider theme={{ ...parentTheme }}>
          <MantineReactTable
            table={table}
            data={rowData || []}
            columns={columnData}
            state={{ isLoading: dataLoading }}
            enableColumnActions={true}
            mantinePaperProps={{ className: classes.paper }}
            mantineTopToolbarProps={{ className: classes.toolbars }}
            mantineBottomToolbarProps={{ className: classes.toolbars }}
            // renderTopToolbarCustomActions={({ tables }) => (
            //   <Box
            //     style={{
            //       display: "flex",
            //       gap: "16px",
            //       padding: "8px",
            //       flexWrap: "wrap",
            //     }}
            //   >
            //     <Button
            //       onClick={handleExportData}
            //       leftSection={<IconDownload size={14} />}
            //       variant="light"
            //       radius={'md'}
            //       color="rgb(76, 108, 90)"
            //     >
            //       Export
            //     </Button>
            //     {extraElement}
            //   </Box>
            // )}
          />
        </MantineProvider>
        {/* )} */}
      </Box>
    </Box>
  );
};

export default MantineTable;
