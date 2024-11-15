# Exporting Files Transmitted via HTTP

This feature allows us to export files transmitted using the HTTP from captured packets, such as images and binary files.

Currently, we are unable to identify files transmitted using HTTP Range requests or those compressed with gzip. If there is indeed a demand for this functionality in the future, we will gradually improve it.

## How to Use

ChatTCP automatically analyzes and identifies all files transferred using the HTTP. If a file is identified, you will see a floating window at the bottom of the left workspace.

Click on the "Export" button, and a file list window will pop up. Select the files you want to export and click "Export" to save them to your local disk.

![How to export files transferred via HTTP protocol in a pcap file - ChatTCP](/images/extract-http-protocol-files/export-http-file.webp)

In the file list, you can see the file name (usually derived from the URL), file type (Content-Type), and file size. If a file is incomplete, a warning symbol will appear next to the file size.
