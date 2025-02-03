const { useState, useEffect } = React;

// 生成唯一ID
const generateUniqueId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
};

// 圖標定義
const Icons = {
    MapPin: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 10c0 6-8 0-8 0s-8 6-8 0a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Users: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    MessageCircle: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    ),
    Settings: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.51a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.51a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    Star: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    Filter: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
    ),
    ChevronDown: (props) => (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 9l6 6 6-6" />
        </svg>
    )
};

// Button 組件
const Button = ({ 
    children, 
    className = '', 
    variant = 'default', 
    ...props 
}) => {
    const variantStyles = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        ghost: 'bg-transparent hover:bg-gray-100'
    };

    return (
        <button
            className={`${variantStyles[variant]} px-4 py-2 rounded-full ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

// Card 組件
const Card = ({ children, className, ...props }) => (
    <div className={`border rounded-lg shadow-sm ${className}`} {...props}>
        {children}
    </div>
);

Card.Content = ({ children, className, ...props }) => (
    <div className={`p-4 ${className}`} {...props}>
        {children}
    </div>
);

// FilterItem 組件
const FilterItem = ({ label, children }) => (
    <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-600">{label}</label>
        {children}
    </div>
);

// Select 組件
const Select = ({ className = '', ...props }) => (
    <select
        className={`w-full border rounded-lg p-2 bg-white text-sm ${className}`}
        {...props}
    />
);

// SearchControls 組件
const SearchControls = ({
    searchMode,
    matchSettings,
    onSearch,
    onUpdateSettings,
    showFilters,
    onToggleFilters
}) => (
    <Card>
        <Card.Content>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onSearch}
                        className={`flex-1 ${searchMode ? 'bg-red-500' : 'bg-green-500'}`}
                    >
                        {searchMode ? '正在搜尋中' : '開始搜尋'}
                    </Button>
                    <Button
                        variant="ghost"
                        className="p-2 md:px-4 border border-gray-200 flex items-center gap-2"
                        onClick={onToggleFilters}
                    >
                        <Icons.Filter className="w-5 h-5" />
                        <span className="hidden md:inline">篩選</span>
                    </Button>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? '' : 'hidden'}`}>
                    <FilterItem label="距離">
                        <Select
                            value={matchSettings.distance}
                            onChange={(e) => onUpdateSettings('distance', parseInt(e.target.value))}
                        >
                            <option value="1">1公里</option>
                            <option value="5">5公里</option>
                            <option value="10">10公里</option>
                        </Select>
                    </FilterItem>

                    <FilterItem label="缺人數">
                        <Select
                            value={matchSettings.players}
                            onChange={(e) => onUpdateSettings('players', parseInt(e.target.value))}
                        >
                            <option value="1">缺1人</option>
                            <option value="2">缺2人</option>
                            <option value="3">缺3人</option>
                        </Select>
                    </FilterItem>

                    <FilterItem label="技能水平">
                        <Select
                            value={matchSettings.skillLevel}
                            onChange={(e) => onUpdateSettings('skillLevel', e.target.value)}
                        >
                            <option value="all">不限</option>
                            <option value="beginner">新手</option>
                            <option value="intermediate">中級</option>
                            <option value="advanced">高級</option>
                        </Select>
                    </FilterItem>

                    <FilterItem label="遊戲時間">
                        <Select
                            value={matchSettings.preferredTime}
                            onChange={(e) => onUpdateSettings('preferredTime', e.target.value)}
                        >
                            <option value="any">不限</option>
                            <option value="morning">上午</option>
                            <option value="afternoon">下午</option>
                            <option value="evening">晚上</option>
                        </Select>
                    </FilterItem>

                    <FilterItem label="排序方式">
                        <Select
                            value={matchSettings.sortBy}
                            onChange={(e) => onUpdateSettings('sortBy', e.target.value)}
                        >
                            <option value="distance">距離</option>
                            <option value="rating">評分</option>
                            <option value="needPlayers">缺人數</option>
                        </Select>
                    </FilterItem>
                </div>
            </div>
        </Card.Content>
    </Card>
);

// PlayerCard 組件
const PlayerCard = ({ player, onJoin, onMessage, isExpanded, onToggleExpand }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <Card.Content>
                <div className="flex flex-col space-y-4">
                    {/* 主要資訊區域 */}
                    <div 
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer"
                        onClick={() => onToggleExpand(player.id)}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <Icons.Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                    <h3 className="font-medium truncate">{player.name}</h3>
                                    {isExpanded && (
                                        <Icons.ChevronDown 
                                            className="w-5 h-5 ml-2 transform rotate-180 transition-transform" 
                                        />
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Icons.MapPin className="w-4 h-4 mr-1" />
                                        <span>{player.distance}km</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Icons.Star className="w-4 h-4 mr-1 text-yellow-500" />
                                        <span>{player.rating.toFixed(1)}</span>
                                    </div>
                                    <span>缺 {player.needPlayers} 人</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                            <Button
                                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm flex-shrink-0"
                                onClick={() => onJoin(player)}
                            >
                                <span className="hidden md:inline">加入</span>
                                <span className="md:hidden">加入房間</span>
                            </Button>
                            <Button
                                variant="ghost"
                                className="p-2 rounded-full bg-gray-100"
                                onClick={() => onMessage(player)}
                            >
                                <Icons.MessageCircle className="w-5 h-5 text-gray-600" />
                            </Button>
                        </div>
                    </div>

                    {/* 展開的詳細資訊區域 */}
                    {isExpanded && (
                        <div className="border-t pt-4 space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">基本資訊</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <div>技能等級：{
                                        player.skillLevel === 'beginner' ? '新手' :
                                        player.skillLevel === 'intermediate' ? '中級' :
                                        player.skillLevel === 'advanced' ? '高級' : '未知'
                                    }</div>
                                    <div>目前狀態：{player.status}</div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-medium mb-2">玩家評價</h4>
                                <div className="space-y-2">
                                    {player.reviews && player.reviews.length > 0 ? (
                                        player.reviews.map((review, index) => (
                                            <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Icons.Star className="w-4 h-4 text-yellow-500" />
                                                    <span>{review.rating}</span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">尚無評價</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
};

// 主要應用組件
const MahjongFinder = () => {
    const [activeTab, setActiveTab] = useState('map');
    const [searchMode, setSearchMode] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [expandedPlayerId, setExpandedPlayerId] = useState(null);
    const [matchSettings, setMatchSettings] = useState({
        distance: 5,
        players: 1,
        location: 'any',
        gameType: 'regular',
        skillLevel: 'all',
        preferredTime: 'any',
        sortBy: 'distance'
    });

    // 初始玩家數據
    const [players] = useState([
        {
            id: generateUniqueId(),
            name: '小明',
            distance: '0.5',
            rating: 4.5,
            status: '正在配對',
            needPlayers: 2,
            skillLevel: 'intermediate',
            reviews: [
                { rating: 4.5, comment: '打牌很有禮貌' },
                { rating: 4.0, comment: '技術不錯' }
            ]
        },
        {
            id: generateUniqueId(),
            name: '阿華',
            distance: '1.2',
            rating: 4.8,
            status: '開放加入',
            needPlayers: 1,
            skillLevel: 'advanced',
            reviews: [
                { rating: 4.8, comment: '非常專業' },
                { rating: 4.7, comment: '配合度高' }
            ]
        }
    ]);

    const [searchResults, setSearchResults] = useState([]);
    const [displayedPlayers, setDisplayedPlayers] = useState(players);

    // 排序玩家
    const sortPlayers = (playersToSort) => {
        return [...playersToSort].sort((a, b) => {
            switch(matchSettings.sortBy) {
                case 'distance':
                    return parseFloat(a.distance) - parseFloat(b.distance);
                case 'rating':
                    return b.rating - a.rating;
                case 'needPlayers':
                    return a.needPlayers - b.needPlayers;
                default:
                    return 0;
            }
        });
    };

    // 篩選玩家
    const filterPlayers = (playersToFilter) => {
        return playersToFilter.filter(player => {
            const distanceMatch = parseFloat(player.distance) <= matchSettings.distance;
            const skillLevelMatch = matchSettings.skillLevel === 'all' || player.skillLevel === matchSettings.skillLevel;
            const playersMatch = player.needPlayers === matchSettings.players;
            return distanceMatch && skillLevelMatch && playersMatch;
        });
    };

    // 更新設置
    const handleUpdateSettings = (key, value) => {
        setMatchSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // 處理搜索
    const handleSearch = () => {
        setSearchMode(prev => {
            const newMode = !prev;
            if (newMode) {
                // 展開篩選選項
                setShowFilters(true);
                
                const mockResults = [
                    ...players,
                    {
                        id: generateUniqueId(),
                        name: '阿強',
                        distance: '0.8',
                        rating: 4.2,
                        status: '可加入',
                        needPlayers: matchSettings.players,
                        skillLevel: 'beginner',
                        reviews: []
                    },
                    {
                        id: generateUniqueId(),
                        name: '小李',
                        distance: '1.5',
                        rating: 4.6,
                        status: '正在等人',
                        needPlayers: matchSettings.players,
                        skillLevel: 'intermediate',
                        reviews: []
                    }
                ];

                const filteredResults = filterPlayers(mockResults);
                const sortedResults = sortPlayers(filteredResults);
                
                if (sortedResults.length === 0) {
                    alert('未找到符合條件的玩家');
                }
                
                setSearchResults(sortedResults);
                setDisplayedPlayers(sortedResults);
            } else {
                setSearchResults([]);
                setDisplayedPlayers(players);
            }
            return newMode;
        });
    };
    // 監聽排序條件變化
    useEffect(() => {
        const currentPlayers = searchResults.length > 0 ? searchResults : players;
        setDisplayedPlayers(sortPlayers(currentPlayers));
    }, [matchSettings.sortBy, searchResults, players]);

    // 處理加入房間
    const handleJoinRoom = (player) => {
        alert(`已向 ${player.name} 發送加入請求`);
    };

    // 處理發送訊息
    const handleSendMessage = (player) => {
        alert(`準備與 ${player.name} 開始聊天`);
    };

    // 處理玩家卡片展開/收起
    const handleToggleExpand = (playerId) => {
        setExpandedPlayerId(prevId => prevId === playerId ? null : playerId);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* 頁首 */}
            <div className="bg-white shadow-sm p-4">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <h1 className="text-xl font-bold text-gray-800">麻將牌咖</h1>
                    <Button
                        variant="ghost"
                        className="p-2 rounded-full bg-gray-100"
                        onClick={() => alert('設置頁面開發中')}
                    >
                        <Icons.Settings className="w-6 h-6 text-gray-600" />
                    </Button>
                </div>
            </div>

            {/* 主內容 */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto p-4">
                    {/* 搜尋控制 */}
                    <div className="mb-4">
                        <SearchControls
                            searchMode={searchMode}
                            matchSettings={matchSettings}
                            onSearch={handleSearch}
                            onUpdateSettings={handleUpdateSettings}
                            showFilters={showFilters}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                        />
                    </div>

                    {/* 玩家列表 */}
                    <div className="space-y-4">
                        {displayedPlayers.map(player => (
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onJoin={handleJoinRoom}
                                onMessage={handleSendMessage}
                                isExpanded={expandedPlayerId === player.id}
                                onToggleExpand={handleToggleExpand}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 底部導航 */}
            <div className="bg-white border-t">
                <div className="max-w-4xl mx-auto flex justify-around p-2">
                    {['map', 'chat', 'profile'].map((tab) => (
                        <Button
                            key={tab}
                            variant="ghost"
                            className={`flex flex-col items-center ${
                                activeTab === tab ? 'text-blue-500' : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'map' && <Icons.MapPin className="w-6 h-6" />}
                            {tab === 'chat' && <Icons.MessageCircle className="w-6 h-6" />}
                            {tab === 'profile' && <Icons.Users className="w-6 h-6" />}
                            <span className="text-xs mt-1">
                                {tab === 'map' ? '地圖' :
                                    tab === 'chat' ? '聊天' :
                                    '個人'}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 渲染應用
ReactDOM.render(
    <MahjongFinder />,
    document.getElementById('root')
);