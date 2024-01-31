// server/api/appendToSheet.js
import { google } from "googleapis"

export default defineEventHandler(async (event) => {
  const serviceAccountEncoded = useRuntimeConfig(event)
    .GOOGLE_SERVICE_ACCOUNT_CREDENTIALS_BASE64 as string

  const formOutput = await readBody(event)

  // Format data for Google Sheets
  const formOutputArray = Object.values(formOutput)

  // Decode the base64 environment variable
  const credentialsJson = Buffer.from(serviceAccountEncoded, "base64").toString(
    "ascii"
  )
  const credentials = JSON.parse(credentialsJson)

  const client = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  )

  const sheets = google.sheets({ version: "v4", auth: client })

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: "1IXVhxZORSCaZpHTtuXyD-4jFP6WFDrZq_CiCJ_W6dSI",
      range: "Sheet1!A2:E200",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [formOutputArray],
      },
    })

    return {
      success: true,
      message: "Data appended successfully",
      data: response.data,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: "Error appending data",
      error,
    }
  }
})
