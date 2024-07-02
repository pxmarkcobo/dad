// app/api/read-xlsx/route.js

import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function GET() {
  console.log(process.cwd())
  const filePath = path.resolve(process.cwd(), "lib/data/sample.xlsx") // Adjust the file path as needed
  const fileContents = fs.readFileSync(filePath)
  const workbook = XLSX.read(fileContents, { type: "buffer" })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const jsonData = XLSX.utils.sheet_to_csv(worksheet)
  console.log(jsonData)
  XLSX.utils.csv
  return NextResponse.json(jsonData)
}
