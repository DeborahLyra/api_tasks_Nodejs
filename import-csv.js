import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./csv/tasks.csv', import.meta.url)

const stream = createReadStream(csvPath)

const csvParse = stream.pipe(
    parse({
        delimiter: ',',
        from_line: 2,
        ltrim: true,
        rtrim: true
    })
)

for await (const record of csvParse) {
    const [title, description] = record

    await fetch('http://localhost:3334/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, description }),
    })
}