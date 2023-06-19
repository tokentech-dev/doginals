#!/bin/bash

#check that 3 arguments are passed in otherwise exit
if [ "$#" -ne 3 ]; then
    echo "Illegal number of parameters"
    echo "Usage: <YOUR_BULK_FILENAME.sh> 0 <YOUR WALLET> <TICKER>"
    exit 1
fi

count=0
max_count=4
total_transactions=0
total_cost_doge=0
total_cost_usd=0
target_address=$2
token_name=$3
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
while true; do
    while [ $count -lt $max_count ]; do
        echo "Current count: $count"
        # 12 is nmbr max of trx ?
        node . drc-20 mint "$target_address" "$token_name" 50 12
        remaining=$((max_count - count))
        echo "Counts left: $remaining"
        sleep 5  # Sleep for 5 seconds
        ((count++))
        ((total_transactions+=12))  # Add 12 to the total transactions count
        total_cost_doge=$(echo "$total_transactions * 0.031" | bc)
        total_cost_usd=$(echo "$total_transactions * 0.07 * 0.031" | bc)
    done
    echo -e "${GREEN}Total transactions sent: $total_transactions${NC}"
    printf "${RED}Total cost in DOGE: %.2f${NC}\n" $total_cost_doge
    printf "${RED}Total cost in USD: %.2f${NC}\n" $total_cost_usd
    rm pending-txs.json
    sleep 5
    node . wallet sync
    sleep 5    
    node . wallet sync
    sleep 600
    count=0
done
