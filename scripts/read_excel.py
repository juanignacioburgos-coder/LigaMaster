import openpyxl
import os
import glob

downloads_dir = r"C:\Users\juani\Downloads"
# Find the exact file
files = glob.glob(os.path.join(downloads_dir, "*.xlsx"))
latest_file = max(files, key=os.path.getmtime)
print(f"Reading file: {latest_file}")

wb = openpyxl.load_workbook(latest_file, data_only=True)
print(f"Sheets found: {wb.sheetnames}")

for name in wb.sheetnames:
    sheet = wb[name]
    print(f"\n--- SHEET: {name} (max_row={sheet.max_row}, max_column={sheet.max_column}) ---")
    rows = list(sheet.iter_rows(values_only=True))
    for i, row in enumerate(rows[:25]): # first 25 rows
        # Filter out empty cells at the end
        filtered = [cell for cell in row if cell is not None]
        if filtered:
            print(f"Row {i+1}: {row[:10]}")
