const ContractABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "campaigns",
		outputs: [
			{
				internalType: "uint256",
				name: "code",
				type: "uint256",
			},
			{
				internalType: "address payable",
				name: "creator",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "goalAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "raisedAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "isOpen",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_goalAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_deadline",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_code",
				type: "uint256",
			},
		],
		name: "startCampaign",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_code",
				type: "uint256",
			},
		],
		name: "contribute",
		outputs: [],
		stateMutability: "payable",
		type: "function",
		payable: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_code",
				type: "uint256",
			},
		],
		name: "getCampaign",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "code",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "creator",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "goalAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "raisedAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isOpen",
						type: "bool",
					},
				],
				internalType: "struct Crowdfunding.Campaign",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_code",
				type: "uint256",
			},
		],
		name: "withdrawFunds",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_code",
				type: "uint256",
			},
		],
		name: "closeCampaign",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_creator",
				type: "address",
			},
		],
		name: "getCreatorCampaign",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "numCampaign",
						type: "uint256",
					},
					{
						components: [
							{
								internalType: "uint256",
								name: "code",
								type: "uint256",
							},
							{
								internalType: "address payable",
								name: "creator",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "goalAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "raisedAmount",
								type: "uint256",
							},
							{
								internalType: "uint256",
								name: "deadline",
								type: "uint256",
							},
							{
								internalType: "bool",
								name: "isOpen",
								type: "bool",
							},
						],
						internalType: "struct Crowdfunding.Campaign[]",
						name: "campaigns",
						type: "tuple[]",
					},
				],
				internalType: "struct Crowdfunding.Creator",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "getCampaigns",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "code",
						type: "uint256",
					},
					{
						internalType: "address payable",
						name: "creator",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "goalAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "raisedAmount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256",
					},
					{
						internalType: "bool",
						name: "isOpen",
						type: "bool",
					},
				],
				internalType: "struct Crowdfunding.Campaign[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "getAllCreators",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
];

export default ContractABI;
